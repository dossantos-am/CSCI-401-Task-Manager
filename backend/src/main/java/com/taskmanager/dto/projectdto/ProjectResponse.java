package com.taskmanager.dto.projectdto;

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
public class ProjectResponse {
    private Long projectId;
    private String name;
    private String description;
    private LocalDate startDate;
    private LocalDate dueDate;
    private ProjectStatus status;
    private Long createdBy;
    private String createdByName;
    private Instant createdAt;
}
