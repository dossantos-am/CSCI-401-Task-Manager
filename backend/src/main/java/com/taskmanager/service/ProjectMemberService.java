package com.taskmanager.service;

import java.util.List;

import com.taskmanager.dto.projectmember.CreateProjectMemberRequest;
import com.taskmanager.dto.projectmember.ProjectMemberResponse;
import com.taskmanager.dto.projectmember.UpdateProjectMemberRequest;

public interface ProjectMemberService {
    ProjectMemberResponse addMember(Long projectId, Long userId, CreateProjectMemberRequest request);
    List<ProjectMemberResponse> getMembersByProject(Long projectId);
    ProjectMemberResponse getMembership(Long projectId, Long userId);
    ProjectMemberResponse updateMemberRole(Long projectId, Long userId, UpdateProjectMemberRequest request);
    void removeMember(Long projectId, Long userId);
}