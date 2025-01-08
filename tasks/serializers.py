from .models import TaskList, Task
from rest_framework import serializers


class TaskListSerializer(serializers.ModelSerializer):
    
    class Meta:
        fields ='__all__'
        
class TaskSerializer(serializers.ModelSerializer):
    
    class Meta:
        fields = '__all__'

