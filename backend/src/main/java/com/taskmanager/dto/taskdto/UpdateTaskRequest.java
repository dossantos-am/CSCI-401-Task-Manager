package com.taskmanager.dto.taskdto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.time.LocalDate;

import com.taskmanager.entity.ProjectStatus;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
// Include fields the client chooses when updating a task
public class UpdateTaskRequest {
    
    @NotBlank
    private String title;

    private String description;

    @NotNull
    private ProjectStatus status;

    @NotNull
    private LocalDate dueDate;
}
