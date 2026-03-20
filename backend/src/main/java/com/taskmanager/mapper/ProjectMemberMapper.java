package com.taskmanager.mapper;

import com.taskmanager.dto.projectmember.ProjectMemberResponse;
import com.taskmanager.entity.ProjectMember;

public class ProjectMemberMapper {
    public static ProjectMemberResponse mapToResponse(ProjectMember projectMember) {
        return new ProjectMemberResponse(
            projectMember.getId().getProjectId(),
            projectMember.getId().getUserId(),
            projectMember.getRole(),
            projectMember.getJoinedAt()
        );
    }
}