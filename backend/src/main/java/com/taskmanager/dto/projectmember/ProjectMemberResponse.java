package com.taskmanager.dto.projectmember;

import java.time.Instant;

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
    private String role;
    private Instant joinedAt;
}