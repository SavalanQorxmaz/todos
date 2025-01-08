from .models import TaskList, Task
from rest_framework import serializers


class TaskListSerializer(serializers.ModelSerializer):
    class Meta:
        model = TaskList
        fields = '__all__'
        
        read_only_fields = ("user",)
        
            
        
class TaskSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Task
        fields = '__all__'

