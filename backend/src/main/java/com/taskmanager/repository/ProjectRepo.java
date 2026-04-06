package com.taskmanager.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.taskmanager.entity.Project;
import com.taskmanager.entity.User;

public interface ProjectRepo extends JpaRepository<Project, Long> {
    List<Project> findByCreatedBy(User user);
}