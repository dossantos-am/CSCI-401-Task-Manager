package com.taskmanager.service;

import java.util.List;

import com.taskmanager.dto.UserDto;

// Interface that defines all the necessary REST API's for User entity
public interface UserService {
    UserDto createUser(UserDto userDto);

    UserDto getUserById(Long userId);

    List<UserDto> getAllUsers();

    UserDto updateUser(Long userId, UserDto updatedUser);

    void deleteUser(Long userId);
}
