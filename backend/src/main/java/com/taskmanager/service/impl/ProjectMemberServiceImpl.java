package com.taskmanager.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.taskmanager.dto.projectmember.CreateProjectMemberRequest;
import com.taskmanager.dto.projectmember.ProjectMemberResponse;
import com.taskmanager.dto.projectmember.UpdateProjectMemberRequest;
import com.taskmanager.repository.ProjectMemberRepo;
import com.taskmanager.repository.ProjectRepo;
import com.taskmanager.repository.UserRepo;
import com.taskmanager.service.ProjectMemberService;
import com.taskmanager.entity.Project;
import com.taskmanager.entity.ProjectMember;
import com.taskmanager.entity.User;
import com.taskmanager.exception.ResourceNotFoundException;
import com.taskmanager.mapper.ProjectMemberMapper;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class ProjectMemberServiceImpl implements ProjectMemberService {
    private final ProjectMemberRepo projectMemberRepo;
    private final ProjectRepo projectRepo;
    private final UserRepo userRepo;

    @Override
    public ProjectMemberResponse addMember(Long projectId, Long userId, CreateProjectMemberRequest request) {
        boolean alreadyIsAMember = projectMemberRepo.existsByProject_ProjectIdAndUser_EmailAddress(projectId, request.getEmail());
        if (alreadyIsAMember) {
            throw new IllegalArgumentException("User is already a member of this project");
        }

        Project project = projectRepo.findById(projectId).orElseThrow(
            () -> new ResourceNotFoundException("Project not found"));

        User user = userRepo.findByEmailAddress(request.getEmail()).orElseThrow(
            () -> new ResourceNotFoundException("User not found"));

        ProjectMember projectMember = new ProjectMember(project, user, request.getRole());
        
        ProjectMember savedMember = projectMemberRepo.save(projectMember);
        return ProjectMemberMapper.mapToResponse(savedMember);
    }

    @Override
    public List<ProjectMemberResponse> getMembersByProject(Long projectId) {
        List<ProjectMember> members = projectMemberRepo.findByProject_ProjectId(projectId);
        
        return members.stream()
            .map(ProjectMemberMapper::mapToResponse)
            .toList();
    }

    @Override
    public ProjectMemberResponse getMembership(Long projectId, Long userId) {
        ProjectMember projectMember = projectMemberRepo
            .findByProject_ProjectIdAndUser_UserId(projectId, userId)
            .orElseThrow(() -> new ResourceNotFoundException("Project membership not found"));

        return ProjectMemberMapper.mapToResponse(projectMember);
    }

    @Override
    public ProjectMemberResponse updateMemberRole(Long projectId, Long userId, UpdateProjectMemberRequest request) {
        ProjectMember projectMember = projectMemberRepo
            .findByProject_ProjectIdAndUser_UserId(projectId, userId)
            .orElseThrow(() -> new ResourceNotFoundException("Project membership not found"));

        projectMember.setRole(request.getRole());

        ProjectMember updatedMember = projectMemberRepo.save(projectMember);
        return ProjectMemberMapper.mapToResponse(updatedMember);
    }

    @Override
    public void removeMember(Long projectId, Long userId) {
        ProjectMember projectMember = projectMemberRepo
            .findByProject_ProjectIdAndUser_UserId(projectId, userId)
            .orElseThrow(() -> new ResourceNotFoundException("Project membership not found"));

        projectMemberRepo.delete(projectMember);
    }
}