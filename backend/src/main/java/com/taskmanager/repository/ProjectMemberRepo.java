package com.taskmanager.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.taskmanager.entity.ProjectMember;
import com.taskmanager.entity.ProjectMemberId;

public interface ProjectMemberRepo extends JpaRepository<ProjectMember, ProjectMemberId> {
    List<ProjectMember> findByProject_ProjectId(Long projectId);
    List<ProjectMember> findByUser_UserId(Long userId);
    Optional<ProjectMember> findByProject_ProjectIdAndUser_UserId(Long projectId, Long userId);
    boolean existsByProject_ProjectIdAndUser_UserId(Long projectId, Long userId);
    boolean existsByProject_ProjectIdAndUser_EmailAddress(Long projectId, String email);
    void deleteByProject_projectIdAndUser_UserId(Long proejctId, Long userId);
}