package com.taskmanager.mapper;

import com.taskmanager.dto.userdto.CreateUserRequest;
import com.taskmanager.dto.userdto.UserResponse;
import com.taskmanager.entity.User;

// Convert DTO --> entity and entity --> DTO
public class UserMapper {
    public static UserResponse mapToUserResponse(User user) {
        return new UserResponse(
            user.getUserId(),
            user.getFirstName(),
            user.getLastName(),
            user.getEmailAddress()
        );
    }

    public static User mapToUser(CreateUserRequest request) {
        User user = new User();
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setEmailAddress(request.getEmailAddress().trim().toLowerCase());
        return user;
    }
}