package com.taskmanager.dto.projectmember;

import java.time.Instant;

import com.taskmanager.entity.ProjectMemberRole;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ProjectMemberResponse {
    private Long projectId;
    private Long userId;
    private ProjectMemberRole role;
    private Instant joinedAt;
}