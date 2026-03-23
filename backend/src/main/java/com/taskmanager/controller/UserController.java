package com.taskmanager.controller;

import java.util.List;

// import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

// import com.taskmanager.dto.userdto.CreateUserRequest;
import com.taskmanager.dto.userdto.UpdateUserRequest;
import com.taskmanager.dto.userdto.UserResponse;
import com.taskmanager.service.UserService;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;

// Controller layer depends on service layer
@AllArgsConstructor
@RestController
@RequestMapping("/api/users")
public class UserController {

    private UserService userService;

    // This was how a user was created before adding authentication. For initial testing only
    // @PostMapping
    // public ResponseEntity<UserResponse> createUser(@Valid @RequestBody CreateUserRequest request) {
    //     UserResponse savedUser = userService.createUser(request);
    //     return new ResponseEntity<>(savedUser, HttpStatus.CREATED);
    // }

    // Get user by ID
    @GetMapping("{id}")
    public ResponseEntity<UserResponse> getUserById(@PathVariable("id") Long userId) {
        UserResponse userResponse = userService.getUserById(userId);
        return ResponseEntity.ok(userResponse);
    }

    // Get all users
    @GetMapping
    public ResponseEntity<List<UserResponse>> getAllUsers() {
        List<UserResponse> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    // Update user
    @PutMapping("{id}")
    public ResponseEntity<UserResponse> updateUser(@PathVariable("id")Long userId, 
                                               @Valid @RequestBody UpdateUserRequest request) {
        UserResponse userResponse = userService.updateUser(userId, request);
        return ResponseEntity.ok(userResponse);
    }

    // Delete user
    @DeleteMapping("{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable("id") Long userId) {
        userService.deleteUser(userId);
        return ResponseEntity.noContent().build();
    }
}