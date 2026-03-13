package com.taskmanager.service;

import java.util.List;

import com.taskmanager.dto.userdto.CreateUserRequest;
import com.taskmanager.dto.userdto.UpdateUserRequest;
import com.taskmanager.dto.userdto.UserResponse;

// Interface that defines all the necessary REST APIs for User entity
public interface UserService {
    UserResponse createUser(CreateUserRequest request);

    UserResponse getUserById(Long userId);

    List<UserResponse> getAllUsers();

    UserResponse updateUser(Long userId, UpdateUserRequest request);

    void deleteUser(Long userId);
}