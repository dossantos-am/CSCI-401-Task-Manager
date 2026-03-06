package com.taskmanager.service.impl;

import org.springframework.stereotype.Service;

import com.taskmanager.dto.UserDto;
import com.taskmanager.entity.User;
import com.taskmanager.mapper.UserMapper;
import com.taskmanager.repository.UserRepo;
import com.taskmanager.service.UserService;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class UserServiceImpl implements UserService{

    private UserRepo userRepo;

    @Override
    public UserDto createUser(UserDto userDto) {
        
        User user = UserMapper.mapToUser(userDto);
        User savedUser = userRepo.save(user);
        return UserMapper.mapToUserDto(savedUser);
    }

}
