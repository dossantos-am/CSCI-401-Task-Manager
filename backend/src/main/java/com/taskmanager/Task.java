package com.taskmanager;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "tasks")
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "task_id")
    private Long taskId;    // Task.id (PK)

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "project_id", nullable = false)
    private Project project;

    @Column(nullable = false)
    private String title;

    @Column(columnDefinition = "text")
    private String description;

    @Column(nullable = false)
    private String status;

    @Column(name = "due_date")
    private LocalDate dueDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "assigned_to", referencedColumnName = "user_id")
    private User assignedTo;

    public Task() {}

    public Task(Project project, String title, String description, 
    String status, LocalDate dueDate, User assignedTo) {
        this.project = project;
        this.title = title;
        this.description = description;
        this.status = status;
        this.dueDate = dueDate;
        this.assignedTo = assignedTo;
    }

    // Getters
    public Long getTaskId() { return taskId; }
    public String getTitle() { return title; }
    public String getDescription() { return description; }
    public String getStatus() { return status; }
    public LocalDate getDueDate() { return dueDate; }
    public User getAssignedTo() { return assignedTo; }

    // Setters
    public void setTitle(String title) { this.title = title; }
    public void setDescription(String description) { this.description = description; }
    public void setStatus(String status) { this.status = status; }
    public void setDueDate(LocalDate dueDate) { this.dueDate = dueDate; }   
}
