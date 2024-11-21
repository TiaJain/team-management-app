from rest_framework import serializers
from django.core.validators import validate_email as django_validate_email # leverage django's built-in email validator
from django.core.exceptions import ValidationError
from .models import TeamMember

class TeamMemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = TeamMember
        fields = '__all__'

    # validation here provides API level validation (user case: typical form submission from our frontend)
    def validate_phone_number(self, value):
        if not value.isdigit() or len(value) < 10 or len(value) > 15:
            raise serializers.ValidationError("Phone number must be between 10 and 15 digits.")
        return value

    def validate_email(self, value):
        try:
            django_validate_email(value)
        except ValidationError:
            raise serializers.ValidationError("Invalid email format.")
        return value