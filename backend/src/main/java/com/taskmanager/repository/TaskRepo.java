package com.taskmanager.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.taskmanager.model.Task;

public interface TaskRepo extends JpaRepository<Task, Long> {}