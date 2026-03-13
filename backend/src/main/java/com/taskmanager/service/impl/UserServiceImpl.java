package com.taskmanager.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.taskmanager.dto.userdto.CreateUserRequest;
import com.taskmanager.dto.userdto.UpdateUserRequest;
import com.taskmanager.dto.userdto.UserResponse;
import com.taskmanager.entity.User;
import com.taskmanager.exception.ResourceNotFoundException;
import com.taskmanager.mapper.UserMapper;
import com.taskmanager.repository.UserRepo;
import com.taskmanager.service.UserService;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class UserServiceImpl implements UserService{

    private UserRepo userRepo;

    // Create user REST API
    @Override
    public UserResponse createUser(CreateUserRequest request) {
        User user = UserMapper.mapToUser(request);

        // Temporary until password hashing is implemented
        user.setHashedPassword(request.getPassword()); 

        User savedUser = userRepo.save(user);
        return UserMapper.mapToUserResponse(savedUser);
    }

    // Get user by id REST API
    @Override
    public UserResponse getUserById(Long userId) {
        User user = userRepo.findById(userId)
        .orElseThrow(() -> 
                new ResourceNotFoundException("User does not exist for the given ID: " + userId));
        return UserMapper.mapToUserResponse(user);
    }

    // Get all users REST API
    @Override
    public List<UserResponse> getAllUsers() {
        List<User> users = userRepo.findAll();
        return users.stream()
                .map((user) -> UserMapper.mapToUserResponse(user))
                .collect(Collectors.toList());
    }

    // Update user REST API
    @Override
    public UserResponse updateUser(Long userId, UpdateUserRequest request) {
        User user = userRepo.findById(userId).orElseThrow(
            () -> new ResourceNotFoundException("User does not exist for the given ID: " + userId));

        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setEmailAddress(request.getEmailAddress());

        User updatedUserObj = userRepo.save(user);

        return UserMapper.mapToUserResponse(updatedUserObj);
    }

    // Delete user REST API
    @Override
    public void deleteUser(Long userId) {
        userRepo.findById(userId).orElseThrow(
            () -> new ResourceNotFoundException("User does not exist for the given ID: " + userId));

        userRepo.deleteById(userId);
    }
}