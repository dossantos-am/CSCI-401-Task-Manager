package com.taskmanager.dto.taskdto;

import com.taskmanager.entity.ProjectStatus;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
// Include fields the client chooses when creating a task
public class CreateTaskRequest {

    @NotBlank
    private Long projectId;

    @NotBlank
    private String title;

    private String description;

    @NotNull
    private ProjectStatus status;

    @NotBlank
    private LocalDate dueDate;

    @NotNull
    private Long assignedTo;
}
