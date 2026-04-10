package com.taskmanager.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.taskmanager.dto.projectmember.CreateProjectMemberRequest;
import com.taskmanager.dto.projectmember.ProjectMemberResponse;
import com.taskmanager.dto.projectmember.UpdateProjectMemberRequest;
import com.taskmanager.service.ProjectMemberService;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/project-members")
@AllArgsConstructor
public class ProjectMemberController {

    private final ProjectMemberService projectMemberService;

    @PostMapping
    public ResponseEntity<ProjectMemberResponse> addMember(
            @RequestParam Long projectId,
            @Valid @RequestBody CreateProjectMemberRequest request) {

        ProjectMemberResponse response = projectMemberService.addMember(projectId, request);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @GetMapping("/project/{projectId}")
    public ResponseEntity<List<ProjectMemberResponse>> getMembersByProject(@PathVariable Long projectId) {
        List<ProjectMemberResponse> members = projectMemberService.getMembersByProject(projectId);
        return ResponseEntity.ok(members);
    }

    @GetMapping("/project/{projectId}/user/{userId}")
    public ResponseEntity<ProjectMemberResponse> getMembership(
            @PathVariable Long projectId,
            @PathVariable Long userId) {

        ProjectMemberResponse response = projectMemberService.getMembership(projectId, userId);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/project/{projectId}/user/{userId}")
    public ResponseEntity<ProjectMemberResponse> updateMemberRole(
            @PathVariable Long projectId,
            @PathVariable Long userId,
            @Valid @RequestBody UpdateProjectMemberRequest request) {

        ProjectMemberResponse response = projectMemberService.updateMemberRole(projectId, userId, request);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/project/{projectId}/user/{userId}")
    public ResponseEntity<String> removeMember(
            @PathVariable Long projectId,
            @PathVariable Long userId) {

        projectMemberService.removeMember(projectId, userId);
        return ResponseEntity.ok("Project member removed successfully");
    }
}