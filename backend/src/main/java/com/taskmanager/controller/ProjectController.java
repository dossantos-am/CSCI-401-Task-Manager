package com.taskmanager.controller;
import com.taskmanager.dto.projectdto.CreateProjectRequest;
import com.taskmanager.dto.projectdto.ProjectResponse;
import com.taskmanager.dto.projectdto.UpdateProjectRequest;
import com.taskmanager.service.ProjectService;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

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

    // Get all prrojects
    @GetMapping
    public ResponseEntity<List<ProjectResponse>> getAllProjects() {
        List<ProjectResponse> projects = projectService.getAllProjects();
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