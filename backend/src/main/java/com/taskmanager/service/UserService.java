package com.taskmanager.service;

import java.util.List;

import com.taskmanager.dto.UserResponse;

// Interface that defines all the necessary REST API's for User entity
public interface UserService {
    UserResponse createUser(UserResponse userDto);

    UserResponse getUserById(Long userId);

    List<UserResponse> getAllUsers();

    UserResponse updateUser(Long userId, UserResponse updatedUser);

    void deleteUser(Long userId);
}
