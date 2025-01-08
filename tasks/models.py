from django.db import models
from users.models import CustomUser

# Create your models here.


class TaskList(models.Model):
    name = models.CharField(max_length=32, blank=False, default='Task List' )
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
    
    
    def __str__(self) -> str:
        return self.name

class Task(models.Model):
    title = models.CharField(max_length=64, blank=False, default='Task')
    description = models.CharField(max_length=255, blank=True)
    list = models.ForeignKey(TaskList, on_delete=models.CASCADE)
    
    def __str__(self) -> str:
        return self.title