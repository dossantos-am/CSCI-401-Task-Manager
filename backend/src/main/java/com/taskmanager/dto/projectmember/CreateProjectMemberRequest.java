package com.taskmanager.dto.projectmember;

import com.taskmanager.entity.ProjectMemberRole;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CreateProjectMemberRequest {
    @NotBlank
    private ProjectMemberRole role;
}