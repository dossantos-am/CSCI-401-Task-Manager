package com.taskmanager.service.impl;

import java.time.Instant;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.taskmanager.dto.projectdto.CreateProjectRequest;
import com.taskmanager.dto.projectdto.ProjectResponse;
import com.taskmanager.dto.projectdto.UpdateProjectRequest;
import com.taskmanager.entity.Project;
import com.taskmanager.entity.User;
import com.taskmanager.exception.ResourceNotFoundException;
import com.taskmanager.mapper.ProjectMapper;
import com.taskmanager.repository.ProjectRepo;
import com.taskmanager.repository.UserRepo;
import com.taskmanager.service.ProjectService;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class ProjectServiceImpl implements ProjectService{

    private ProjectRepo projectRepo;
    private UserRepo userRepo;

    // Create project REST API
    @Override
    public ProjectResponse createProject(Long userId, CreateProjectRequest request) {
        Project project = ProjectMapper.mapToProject(request);

        User user = userRepo.findById(userId).orElseThrow(
            () -> new ResourceNotFoundException("User does not exist for the given ID: " + userId));

        project.setCreatedBy(user);
        project.setCreatedAt(Instant.now());

        Project savedProject = projectRepo.save(project);
        return ProjectMapper.mapToProjectResponse(savedProject);
    }

    // Get project by id REST API
    @Override
    public ProjectResponse getProjectById(Long projectId) {
        Project project = projectRepo.findById(projectId).orElseThrow(
            () -> new ResourceNotFoundException("Project does not exist for the given ID: " + projectId));
        return ProjectMapper.mapToProjectResponse(project);
    }

    // Get all projects REST API
    @Override
    public List<ProjectResponse> getAllProjects() {
        List<Project> projects = projectRepo.findAll();
        return projects.stream()
                .map((project) -> ProjectMapper.mapToProjectResponse(project))
                .collect(Collectors.toList());
    }

    // Update project REST API
    @Override
    public ProjectResponse updateProject(Long projectId, UpdateProjectRequest request) {
        Project project = projectRepo.findById(projectId).orElseThrow(
            () -> new ResourceNotFoundException("Project does not exist for the given ID: " + projectId));
        project.setName(request.getName());
        project.setDescription(request.getDescription());
        project.setStartDate(request.getStartDate());
        project.setDueDate(request.getDueDate());
        project.setStatus(request.getStatus());

        Project updatedProjectObj = projectRepo.save(project);

        return ProjectMapper.mapToProjectResponse(updatedProjectObj);
    }

    // Delete project REST API
    @Override
    public void deleteProject(Long projectId) {
        projectRepo.findById(projectId).orElseThrow(
            () -> new ResourceNotFoundException("Project does not exist for the given ID: " + projectId));
        
        projectRepo.deleteById(projectId);
    }
}