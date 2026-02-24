// Join entity

package com.taskmanager;

import jakarta.persistence.*;
import java.time.Instant;

@Entity
@Table(name = "project_members")
public class ProjectMember {

    @EmbeddedId
    private ProjectMemberId id;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("projectId")
    @JoinColumn(name = "project_id", nullable = false)
    private Project project;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("userId")
    @JoinColumn(name = "user_id", referencedColumnName = "user_id", nullable = false)
    private User user;

    // OWNER, EDITOR, or VIEWER
    @Column(nullable = false)
    private String role;

    @Column(name = "joined_at", nullable = false, updatable = false)
    private Instant joinedAt = Instant.now();

    public ProjectMember() {}

    public ProjectMember (Project project, User user, String role) {
        this.project = project;
        this.user = user;
        this.role = role;
        this.id = new ProjectMemberId(project.getProjectId(), user.getUserId());
    }

    // Getters
    public ProjectMemberId getId() { return id; }
    public String getRole() { return role; }
    public Instant getJoinedAt() { return joinedAt; }

    // Setter
    public void setRole(String role) { this.role = role; }
}