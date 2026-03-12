package com.taskmanager.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.taskmanager.dto.UserDto;
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
    public UserDto createUser(UserDto userDto) {
        
        User user = UserMapper.mapToUser(userDto);
        User savedUser = userRepo.save(user);
        return UserMapper.mapToUserDto(savedUser);
    }

    // Get user by id REST API
    @Override
    public UserDto getUserById(Long userId) {
        User user = userRepo.findById(userId)
        .orElseThrow(() -> 
                new ResourceNotFoundException("User does not exist for given ID: " + userId));
        return UserMapper.mapToUserDto(user);
    }

    // Get all users REST API
    @Override
    public List<UserDto> getAllUsers() {
        List<User> users = userRepo.findAll();
        return users.stream().map((user) -> UserMapper.mapToUserDto(user))
                .collect(Collectors.toList());
    }

    // Update user REST API
    @Override
    public UserDto updateUser(Long userId, UserDto updatedUser) {

        User user = userRepo.findById(userId).orElseThrow(
            () -> new ResourceNotFoundException("User does not exist for given ID: " + userId)
        );

        user.setFirstName(updatedUser.getFirstName());
        user.setLastName(updatedUser.getLastName());
        user.setEmailAddress(updatedUser.getEmailAddress());
        user.setHashedPassword(updatedUser.getHashedPassword());

        User updatedUserObj = userRepo.save(user);

        return UserMapper.mapToUserDto(updatedUserObj);
    }

    @Override
    public void deleteUser(Long userId) {
        User user = userRepo.findById(userId).orElseThrow(
            () -> new ResourceNotFoundException("User does not exist for given ID: " + userId)
        );

        userRepo.deleteById(userId);
    }
}
