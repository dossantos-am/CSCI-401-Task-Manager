package com.taskmanager.service;

import java.util.List;

import com.taskmanager.dto.CreateUserRequest;
import com.taskmanager.dto.UpdateUserRequest;
import com.taskmanager.dto.UserResponse;

// Interface that defines all the necessary REST API's for User entity
public interface UserService {
    UserResponse createUser(CreateUserRequest request);

    UserResponse getUserById(Long userId);

    List<UserResponse> getAllUsers();

    UserResponse updateUser(Long userId, UpdateUserRequest request);

    void deleteUser(Long userId);
}