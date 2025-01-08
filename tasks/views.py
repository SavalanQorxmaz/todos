from rest_framework import serializers, generics, status, viewsets
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from users.models import CustomUser
from .serializers import TaskSerializer, TaskListSerializer
from .models import Task, TaskList



class TaskListAPI(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = TaskListSerializer

    def get_queryset(self):
        return TaskList.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    
    
class TaskAPI(generics.ListCreateAPIView):
    permission_classes = (IsAuthenticated, )
    serializer_class = TaskSerializer
    
    def get_queryset(self):
        return Task.objects.filter(list__user=self.request.user)
    
    def perform_create(self, serializer):
        task_list = serializer.validated_data.get('list')
        if task_list and task_list.user == self.request.user:
            # Associate the new task with the provided task list
            serializer.save()
        else:
            # Handle the case where the task list does not belong to the user
            raise serializers.ValidationError("You can only add tasks to your own task lists.")

