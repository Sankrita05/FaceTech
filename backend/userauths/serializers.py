from rest_framework import serializers
from .models import CustomUser


class RegisterSerializer(serializers.ModelSerializer):
    """
    Serializer for registering a new user.
    Validates password strength and matching confirmation.
    """
    password = serializers.CharField(write_only=True) 
    confirm_password = serializers.CharField(write_only=True)

    class Meta:
        model = CustomUser
        fields = [
            'name',  
            'email', 
            'password', 
            'confirm_password'
        ]

    def validate(self, data):
        password = data.get("password")
        confirm_password = data.get('confirm_password')
        
        if password != confirm_password:
            raise serializers.ValidationError("Passwords do not match.")
        return data 
    
class SendEmailOTPSerializer(serializers.Serializer):
    """
    Serializer for sending OTP to email during registration or password reset.
    """
    email = serializers.EmailField()

class OTPVerifySerializer(serializers.Serializer):
    """
    Serializer for verifying email or mobile OTP.
    """
    email = serializers.EmailField()
    otp_code = serializers.CharField(max_length=6)
   
class LoginSerializer(serializers.Serializer):
    """
    Serializer for logging in a user with email and password.
    """
    email = serializers.EmailField()
    password = serializers.CharField()
    

class ForgotPasswordSerializer(serializers.Serializer):
    """
    Serializer for initiating the forgot password process via email.
    """
    email = serializers.EmailField()
    
class ResetPasswordSerializer(serializers.Serializer):
    """
    Serializer for resetting the password using a verified OTP.
    """
    email = serializers.EmailField()
    otp_code = serializers.CharField(max_length=6)
    new_password = serializers.CharField()
