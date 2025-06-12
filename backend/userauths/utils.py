import random
import logging
from datetime import timedelta

from django.conf import settings
from django.utils import timezone
from django.db.models import Q
from django.contrib.auth.hashers import make_password

import sib_api_v3_sdk
from sib_api_v3_sdk.rest import ApiException

from .models import OTP, TemporaryUserData

logger = logging.getLogger('core')  # Use the custom 'core' logger

def generate_otp():
    """Generate a 6-digit numeric OTP."""
    return str(random.randint(100000, 999999))


def cleanup_temp_user(email):
    """
    Remove expired or conflicting temporary user entries.
    This prevents issues with duplicate email or phone registration.
    """
    expiry_time = timezone.now() - timedelta(minutes=10)
    TemporaryUserData.objects.filter(
        Q(email=email),
        created_at__lt=expiry_time
    ).delete()

    TemporaryUserData.objects.filter(
        Q(email=email)
    ).delete()


def create_temp_user(validated_data):
    """
    Save user data temporarily before full registration (until OTPs are verified).
    """
    temp_user = TemporaryUserData.objects.create(
        name=validated_data['name'],
        email=validated_data['email'],
        password=make_password(validated_data['password']),
    )
    return temp_user


def send_email_otp(email, purpose='register'):
    """
    Send an OTP to the user's email using Brevo (Sendinblue).
    """
    otp_code = generate_otp()

    OTP.objects.filter(email=email, purpose=purpose).delete()
    OTP.objects.create(email=email, otp_code=otp_code, purpose=purpose)

    configuration = sib_api_v3_sdk.Configuration()
    configuration.api_key['api-key'] = settings.BREVO_API_KEY

    sender = {
        "name": settings.EMAIL_OTP_SENDER_NAME,
        "email": settings.EMAIL_OTP_SENDER_EMAIL
    }

    subject = "Your OTP Code"
    html_content = f"<html><body><h3>Your OTP is: <strong>{otp_code}</strong></h3></body></html>"

    to = [{"email": email}]
    send_smtp_email = sib_api_v3_sdk.SendSmtpEmail(
        to=to,
        html_content=html_content,
        subject=subject,
        sender=sender
    )

    try:
        api_instance = sib_api_v3_sdk.TransactionalEmailsApi(
            sib_api_v3_sdk.ApiClient(configuration)
        )
        api_instance.send_transac_email(send_smtp_email)
        return otp_code

    except ApiException as e:
        return False

def verify_email_otp(email, otp_code):
    """
    Verify an OTP against the provided email, checking for expiry and duplication.
    Returns:
        - otp instance if valid
        - error message string if invalid
    """
    try:
        otp = OTP.objects.filter(email=email, otp_code=otp_code).latest('created_at')
    except OTP.DoesNotExist:
        logger.warning(f"OTP verification failed for {email} - OTP not found")
        return None, "Invalid or expired OTP"

    if otp.is_verified:
        logger.info(f"OTP for {email} already verified")
        return None, "OTP already verified"

    if otp.is_expired():
        logger.info(f"OTP for {email} has expired")
        return None, "OTP has expired"

    otp.is_verified = True
    otp.save()
    logger.info(f"OTP successfully verified for {email}")
    return otp, None

