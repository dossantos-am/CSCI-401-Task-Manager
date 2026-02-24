package com.taskmanager;

import jakarta.persistence.*;
import java.time.Instant;
import java.time.LocalDate;

@Entity
@Table(name = "projects")
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "project_id")
    private Long projectId;    // Project.id (PK)

    private String name;
    private String description;

    @Column(name = "start_date")
    private LocalDate startDate;

    @Column(name = "due_date")
    private LocalDate dueDate;

    @Column(nullable = false)
    private String status;

    @ManyToOne
    @JoinColumn(name = "created_by", referencedColumnName = "user_id", nullable = false)
    private User createdBy;

    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdAt = Instant.now();

    public Project() {}

    public Project(String name, String description, LocalDate startDate, LocalDate dueDate,
                   String status, User createdBy) {
        this.name = name;
        this.description = description;
        this.startDate = startDate;
        this.dueDate = dueDate;
        this.status = status;
        this.createdBy = createdBy;
    }

    // Getters
    public Long getProjectId() { return projectId; }
    public String getName() { return name; }
    public String getDescription() { return description; }
    public LocalDate getStartDate() { return startDate; }
    public LocalDate getDueDate() { return dueDate; }
    public String getStatus() { return status; }
    public User getCreatedBy() { return createdBy; }
    public Instant getCreatedAt() { return createdAt; }

    // Setters
    //public void setId(Long id) { this.id = id; }
    public void setName(String name) { this.name = name; }
    public void setDescription(String description) { this.description = description; }
    public void setStartDate(LocalDate startDate) { this.startDate = startDate; }
    public void setDueDate(LocalDate dueDate) { this.dueDate = dueDate; }
    public void setStatus(String status) { this.status = status; }
    //public void setCreatedBy(String createdBy) { this.createdBy = createdBy; }
    //public void setCreatedAt(String createdAt) { this.createdAt = createdAt; }
}
