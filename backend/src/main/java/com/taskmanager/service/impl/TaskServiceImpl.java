package com.taskmanager.service.impl;

import java.time.Instant;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.taskmanager.dto.taskdto.CreateTaskRequest;
import com.taskmanager.dto.taskdto.TaskResponse;
import com.taskmanager.dto.taskdto.UpdateTaskRequest;
import com.taskmanager.entity.Project;
import com.taskmanager.entity.Task;
import com.taskmanager.exception.ResourceNotFoundException;
import com.taskmanager.mapper.TaskMapper;
import com.taskmanager.repository.ProjectRepo;
import com.taskmanager.repository.TaskRepo;
import com.taskmanager.service.TaskService;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class TaskServiceImpl implements TaskService {

    private ProjectRepo projectRepo;
    private TaskRepo taskRepo;

    @Override
    public TaskResponse createTask(Long projectId, CreateTaskRequest request) {
        Project project = projectRepo.findById(projectId).orElseThrow(
                () -> new ResourceNotFoundException("Project does not exist for the given ID: " + projectId));
        
        Task task = TaskMapper.mapToTask(request);
        task.setProject(project);
        
        Task savedTask = taskRepo.save(task);

        return TaskMapper.mapToTaskResponse(savedTask);
    }

    @Override
    public List<TaskResponse> getTasksByProjectId(Long projectId) {
        Project project = projectRepo.findById(projectId).orElseThrow(
            () -> new ResourceNotFoundException("Project does not exist for the given ID: " + projectId));
        
        List<Task> tasks = taskRepo.findByProject(project);

        return tasks.stream()
            .map((task) -> TaskMapper.mapToTaskResponse(task))
            .collect(Collectors.toList());
    }

    @Override
    public TaskResponse getTaskById(Long taskId) {
        Task task = taskRepo.findById(taskId).orElseThrow(
            () -> new ResourceNotFoundException("Task does not exist for the given ID: " + taskId));

        return TaskMapper.mapToTaskResponse(task);
    }

    @Override
    public TaskResponse updateTask(Long taskId, UpdateTaskRequest request) {
        Task task = taskRepo.findById(taskId).orElseThrow(
            () -> new ResourceNotFoundException("Task does not exist for the given ID: " + taskId));
        task.setTitle(request.getTitle());
        task.setDescription(request.getDescription());
        task.setStatus(request.getStatus());
        task.setDueDate(request.getDueDate());

        Task updatedTask = taskRepo.save(task);

        return TaskMapper.mapToTaskResponse(updatedTask);
    }

    @Override
    public void deleteTask(Long taskId) {
        Task task = taskRepo.findById(taskId).orElseThrow(
            () -> new ResourceNotFoundException("Task does not exist for the given ID: " + taskId));

        taskRepo.delete(task);
    }
}