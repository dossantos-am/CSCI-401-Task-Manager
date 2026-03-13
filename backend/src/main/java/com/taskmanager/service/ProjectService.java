package com.taskmanager.service;

import java.util.List;

import com.taskmanager.dto.projectdto.CreateProjectRequest;
import com.taskmanager.dto.projectdto.ProjectResponse;
import com.taskmanager.dto.projectdto.UpdateProjectRequest;

// Interface that defines all the necessary REST APIs for Project entity
public interface ProjectService {
    ProjectResponse createProject(Long userId, CreateProjectRequest request);

    ProjectResponse getProjectById(Long projectId);

    List<ProjectResponse> getAllProjects();

    ProjectResponse updateProject(Long projectId, UpdateProjectRequest request);
    
    void deleteProject(Long projectId);
}