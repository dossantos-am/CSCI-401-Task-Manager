package com.taskmanager.dto.taskdto;

import java.time.Instant;
import java.time.LocalDate;

import com.taskmanager.entity.ProjectStatus;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TaskResponse {
    private Long taskId;
    private Long projectId;
    private String title;
    private String description;
    private ProjectStatus status;
    private LocalDate dueDate;
    private Long assignedToUserId;
    private String assignedToName;
    private Instant createdAt;
}
