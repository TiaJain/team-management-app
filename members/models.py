from django.db import models
from django.core.validators import RegexValidator, EmailValidator
# need to add validation here to ensure data integrity at the database level (in case someone interacts directly w/ the model)

class TeamMember(models.Model):
    # enforce field lvl validation
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    phone_number = models.CharField(
        max_length=15,
        validators=[
            RegexValidator(
                regex=r'^\d{10,15}$',
                message='Phone number must be between 10 to 15 digits and contain only numbers.'
            )
        ]
    )
    email = models.EmailField(
        validators=[
            EmailValidator(message='Please enter a valid email address.')
        ]
    )
    role = models.CharField(max_length=10, choices=[('regular', 'Regular'), ('admin', 'Admin')])

    def __str__(self):
        return f"{self.first_name} {self.last_name} ({self.role})"
    