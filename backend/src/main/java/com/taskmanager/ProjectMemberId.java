package com.taskmanager;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import java.io.Serializable;
import lombok.EqualsAndHashCode;

@Embeddable
@EqualsAndHashCode
public class ProjectMemberId implements Serializable{
    
    @Column(name = "project_id")
    private Long projectId;

    @Column(name = "user_id")
    private Long userId;

    public ProjectMemberId() {}

    public ProjectMemberId(Long projectId, Long userId) {
        this.projectId = projectId;
        this.userId = userId;
    }

    // Getters
    public Long getProjectId() { return projectId; }
    public Long getUserId() { return userId; }

}