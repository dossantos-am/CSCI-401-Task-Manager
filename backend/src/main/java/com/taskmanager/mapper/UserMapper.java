package com.taskmanager.mapper;

import com.taskmanager.dto.CreateUserRequest;
import com.taskmanager.dto.UserResponse;
import com.taskmanager.entity.User;

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
        user.setEmailAddress(request.getEmailAddress());
        return user;
    }
}