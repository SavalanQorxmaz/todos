from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from .serializers import TaskSerializer, TaskListSerializer
from .models import Task, TaskList



class TaskListAPI(generics.ListCreateAPIView):
    permission_classes = (IsAuthenticated, )
    serializer_class = TaskListSerializer
    queryset = TaskList.objects.all()
    
    
class TaskAPI(generics.ListCreateAPIView):
    permission_classes = (IsAuthenticated, )
    serializer_class = TaskSerializer
    queryset = Task.objects.all()
