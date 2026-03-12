package com.taskmanager.mapper;

import com.taskmanager.dto.UserResponse;
import com.taskmanager.entity.User;

public class UserMapper {
    public static UserResponse mapToUserDto(User user) {
        return new UserResponse(
            user.getUserId(),
            user.getFirstName(),
            user.getLastName(),
            user.getEmailAddress()
        );
    }

    public static User mapToUser(UserResponse userDto) {
        return new User(
            userDto.getUserId(),
            userDto.getFirstName(),
            userDto.getLastName(),
            userDto.getEmailAddress()
        );
    }
}