package com.taskmanager.mapper;

import com.taskmanager.dto.taskdto.CreateTaskRequest;
import com.taskmanager.dto.taskdto.TaskResponse;
import com.taskmanager.dto.taskdto.UpdateTaskRequest;
import com.taskmanager.entity.Task;
import com.taskmanager.entity.User;

// Convert DTO --> entity and entity --> DTO
public class TaskMapper {
    public static TaskResponse mapToTaskResponse(Task task) {
        Long assignedToUserId = null;
        String assignedToName = null;

        User assignedTo = task.getAssignedTo();
        if (assignedTo != null) {
            assignedToUserId = assignedTo.getUserId();
            assignedToName = assignedTo.getFirstName() + " " + assignedTo.getLastName();
        }

        return new TaskResponse(
            task.getTaskId(),
            task.getProject().getProjectId(),
            task.getTitle(),
            task.getDescription(),
            task.getStatus(),
            task.getDueDate(),
            assignedToUserId,
            assignedToName,
            task.getCreatedAt()
        );
    }

    public static Task mapToTask(CreateTaskRequest request) {
        Task task = new Task();
        task.setTitle(request.getTitle());
        task.setDescription(request.getDescription());
        task.setStatus(request.getStatus());
        task.setDueDate(request.getDueDate());
        return task;
    }
}
