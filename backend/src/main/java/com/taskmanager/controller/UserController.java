package com.taskmanager.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.taskmanager.dto.UserResponse;
import com.taskmanager.service.UserService;

import lombok.AllArgsConstructor;

// Controller layer depends on service layer
@AllArgsConstructor
@RestController
@RequestMapping("/api/users")
public class UserController {

    private UserService userService;

    // Create Add User REST API
    @PostMapping
    public ResponseEntity<UserResponse> createUser(@RequestBody UserResponse userDto) {
        UserResponse savedUser = userService.createUser(userDto);
        return new ResponseEntity<>(savedUser, HttpStatus.CREATED);
    }

    // Create
    // Create Get User REST API
    @GetMapping("{id}")
    public ResponseEntity<UserResponse> getUserById(@PathVariable("id") Long userId) {
        UserResponse userDto = userService.getUserById(userId);
        return ResponseEntity.ok(userDto);
    }

    // Read
    // Create Get all users REST API
    @GetMapping
    public ResponseEntity<List<UserResponse>> getAllUsers() {
        List<UserResponse> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    // Update
    // Create update user REST API
    @PutMapping("{id}")
    public ResponseEntity<UserResponse> updatedUser(@PathVariable("id")Long userId, 
                                               @RequestBody UserResponse updatedUser) {
        UserResponse userDto = userService.updateUser(userId, updatedUser);
        return ResponseEntity.ok(userDto);
    }

    // Delete
    // Create delete user REST API
    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteUser(@PathVariable("id") Long userId) {
        userService.deleteUser(userId);
        return ResponseEntity.ok("User deleted successfully.");
    }
}