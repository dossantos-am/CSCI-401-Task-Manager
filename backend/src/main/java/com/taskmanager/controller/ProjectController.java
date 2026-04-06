package com.taskmanager.controller;
import com.taskmanager.dto.projectdto.CreateProjectRequest;
import com.taskmanager.dto.projectdto.ProjectResponse;
import com.taskmanager.dto.projectdto.UpdateProjectRequest;
import com.taskmanager.service.ProjectService;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;

// Controller layer depends on service layer
@AllArgsConstructor
@RestController
@RequestMapping("/api/projects")
public class ProjectController {

    private ProjectService projectService;

    // Create project
    @PostMapping
    public ResponseEntity<ProjectResponse> createProject(@RequestParam Long userId, @Valid @RequestBody CreateProjectRequest request) {
        ProjectResponse savedProject = projectService.createProject(userId, request);
        return new ResponseEntity<>(savedProject, HttpStatus.CREATED);
    }

    // Get project by ID
    @GetMapping("{id}")
    public ResponseEntity<ProjectResponse> getProjectById(@PathVariable("id") Long projectId) {
        ProjectResponse projectResponse = projectService.getProjectById(projectId);
        return ResponseEntity.ok(projectResponse);
    }

    // Get projects for the authenticated user
    @GetMapping
    public ResponseEntity<List<ProjectResponse>> getProjectsByUser() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        List<ProjectResponse> projects = projectService.getProjectsByUser(email);
        return ResponseEntity.ok(projects);
    }

    // Update project
    @PutMapping("{id}")
    public ResponseEntity<ProjectResponse> updateProject(@PathVariable("id") Long projectId,
                                                        @Valid @RequestBody UpdateProjectRequest request) {
        ProjectResponse projectResponse = projectService.updateProject(projectId, request);
        return ResponseEntity.ok(projectResponse);
    }

    // Delete project
    @DeleteMapping("{id}")
    public ResponseEntity<Void> deleteProject(@PathVariable("id") Long projectId) {
        projectService.deleteProject(projectId);
        return ResponseEntity.noContent().build();
    }
}