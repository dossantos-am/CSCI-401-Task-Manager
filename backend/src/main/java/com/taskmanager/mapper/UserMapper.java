package com.taskmanager.mapper;

import com.taskmanager.dto.UserDto;
import com.taskmanager.entity.User;

public class UserMapper {
    public static UserDto mapToUserDto(User user) {
        return new UserDto(
            user.getUserId(),
            user.getName(),
            user.getEmailAddress(),
            user.getHashedPassword()
        );
    }

    public static User mapToUser(UserDto userDto) {
        return new User(
            userDto.getUserId(),
            userDto.getName(),
            userDto.getEmailAddress(),
            userDto.getHashedPassword()
        );
    }
}
