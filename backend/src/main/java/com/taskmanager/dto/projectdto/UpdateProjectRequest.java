package com.taskmanager.dto.projectdto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.time.LocalDate;

import com.taskmanager.entity.ProjectStatus;

import jakarta.annotation.Nullable;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
// Include fields the client chooses when creating a project
public class UpdateProjectRequest {
    
    @NotBlank
    private String name;

    @Nullable
    private String description;

    @NotNull
    private LocalDate startDate;

    @NotNull
    private LocalDate dueDate;

    @NotNull
    private ProjectStatus status;
}