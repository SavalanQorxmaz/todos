from rest_framework import serializers
from .models import CustomUser
from django.contrib import auth
from rest_framework.exceptions import AuthenticationFailed
from rest_framework_simplejwt.tokens import RefreshToken, TokenError



class RegisterSerializer(serializers.ModelSerializer):
    password_again = serializers.CharField(write_only=True, required=True)
    class Meta:
        model = CustomUser
        fields = ['email', 'password', 'password_again']
        extra_kwargs = {
                    'password': {'write_only': True}
                }
        def validate(self, attrs):
            if attrs['password'] != attrs['password_again']:
                raise serializers.ValidationError({"password": "Password fields didn't match."})
        
        # email_exists = CustomUser.objects.filter('email').exists()
        
        # if email_exists:
        #     raise ValidationError({'message': 'Email has already been use'})
        # return attrs

    def create(self, validated_data):
        user = CustomUser.objects.create(
            email=validated_data['email']
        )
        user.set_password(validated_data['password'])
        user.save()

        return user
    
    

class LoginSerializer(serializers.ModelSerializer):
    password = serializers.CharField(max_length=68, min_length=6,write_only=True)
    email = serializers.CharField(max_length=255, min_length=3)
    tokens = serializers.SerializerMethodField()
    def get_tokens(self, obj):
        user = CustomUser.objects.get(email=obj['email'])
        return {
            'refresh': user.tokens()['refresh'],
            'access': user.tokens()['access']
        }
        
    def validate(self, attrs):
        email = attrs.get('email','')
        password = attrs.get('password','')
        user = auth.authenticate(email=email,password=password)
        if not user:
            raise AuthenticationFailed('Invalid credentials, try again')
        if not user.is_active:
            raise AuthenticationFailed('Account disabled, contact admin')
        return {
            'email': user.email,
            'tokens': user.tokens
        }
        
    class Meta:
        model = CustomUser
        fields = ['password','email','tokens']

class LogoutSerializer(serializers.Serializer):
    refresh = serializers.CharField()
    def validate(self, attrs):
        self.token = attrs['refresh']
        return attrs
    def save(self, **kwargs):
        try:
            RefreshToken(self.token).blacklist()
        except TokenError:
            self.fail('bad_token')
        