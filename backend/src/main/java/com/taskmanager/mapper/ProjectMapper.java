package com.taskmanager.mapper;

import com.taskmanager.dto.projectdto.CreateProjectRequest;
import com.taskmanager.dto.projectdto.ProjectResponse;
import com.taskmanager.entity.Project;

// Convert DTO --> entity and entity --> DTO
public class ProjectMapper {
    public static ProjectResponse mapToProjectResponse(Project project) {
        return new ProjectResponse(
            project.getProjectId(),
            project.getName(),
            project.getDescription(),
            project.getStartDate(),
            project.getDueDate(),
            project.getStatus(),
            project.getCreatedBy().getUserId(),
            project.getCreatedAt()
        );
    }

    public static Project mapToProject(CreateProjectRequest request) {
        Project project = new Project();
        project.setName(request.getName());
        project.setDescription(request.getDescription());
        project.setStartDate(request.getStartDate());
        project.setDueDate(request.getDueDate());
        project.setStatus(request.getStatus());
        return project;
    }
}