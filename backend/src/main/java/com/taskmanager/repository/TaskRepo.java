package com.taskmanager.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.taskmanager.entity.Task;

public interface TaskRepo extends JpaRepository<Task, Long> {}