from django.urls import path

from .views import (
    RegisterView,
    VerifyEmailOTPView,
    SendEmailOTPView,
    LoginView,
    LogoutView,
    ForgotPasswordView,
    ResetPasswordView,
)

urlpatterns = [
    # Registration and OTP
    path('register/', RegisterView.as_view(), name='register'),
    path('send-email-otp/', SendEmailOTPView.as_view(), name='send_email_otp'),
    path('verify-email/', VerifyEmailOTPView.as_view(), name='verify_email'),

    # Authentication
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),

    # Password Management
    path('forgot-password/', ForgotPasswordView.as_view(), name='forgot_password'),
    path('reset-password/', ResetPasswordView.as_view(), name='reset_password'),
]


