package com.taskmanager.service;

import java.util.List;

import com.taskmanager.dto.taskdto.CreateTaskRequest;
import com.taskmanager.dto.taskdto.TaskResponse;
import com.taskmanager.dto.taskdto.UpdateTaskRequest;

public interface TaskService {
    TaskResponse createTask(Long projectId, CreateTaskRequest request);

    List<TaskResponse> getTasksByProjectId(Long projectId);

    TaskResponse getTaskById(Long taskId);

    TaskResponse updateTask(Long taskId, UpdateTaskRequest request);

    TaskResponse assignTask(Long taskId, String email);

    void deleteTask(Long taskId);
}
