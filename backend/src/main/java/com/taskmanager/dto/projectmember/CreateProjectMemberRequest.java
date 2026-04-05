package com.taskmanager.dto.projectmember;

import com.taskmanager.entity.ProjectMemberRole;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CreateProjectMemberRequest {
    @NotNull
    private ProjectMemberRole role;

    @Email
    @NotNull
    private String email;
}