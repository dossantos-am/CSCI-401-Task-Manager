package com.taskmanager.controller;

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

import com.taskmanager.dto.taskdto.CreateTaskRequest;
import com.taskmanager.dto.taskdto.TaskResponse;
import com.taskmanager.dto.taskdto.UpdateTaskRequest;
import com.taskmanager.service.TaskService;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;

@AllArgsConstructor
@RestController
@RequestMapping("/api/tasks")
public class TaskController {
    private TaskService taskService;

    @PostMapping
    public ResponseEntity<TaskResponse> createTask(@RequestParam Long projectId, @Valid @RequestBody CreateTaskRequest request) {
        TaskResponse savedTask = taskService.createTask(projectId, request);
        return new ResponseEntity<>(savedTask, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<TaskResponse>> getTasksByProjectId(@RequestParam Long projectId) {
        List<TaskResponse> tasks = taskService.getTasksByProjectId(projectId);
        return ResponseEntity.ok(tasks);
    }

    @GetMapping("{id}")
    public ResponseEntity<TaskResponse> getTaskById(@PathVariable("id") Long taskId) {
        TaskResponse taskResponse = taskService.getTaskById(taskId);
        return ResponseEntity.ok(taskResponse);
    }

    @PutMapping("{id}")
    public ResponseEntity<TaskResponse> updateTask(@PathVariable("id") Long taskId, @Valid @RequestBody UpdateTaskRequest request) {
        TaskResponse taskResponse = taskService.updateTask(taskId, request);
        return ResponseEntity.ok(taskResponse);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable("id") Long taskId) {
        taskService.deleteTask(taskId);
        return ResponseEntity.noContent().build();
    }
}