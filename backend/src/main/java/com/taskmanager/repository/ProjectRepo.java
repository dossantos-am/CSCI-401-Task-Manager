package com.taskmanager.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.taskmanager.entity.Project;

public interface ProjectRepo extends JpaRepository<Project, Long> {}