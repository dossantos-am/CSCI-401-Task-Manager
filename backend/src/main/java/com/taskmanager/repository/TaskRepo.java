package com.taskmanager.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.taskmanager.entity.Project;
import com.taskmanager.entity.Task;

public interface TaskRepo extends JpaRepository<Task, Long> {
    List<Task> findByProject(Project project);
}