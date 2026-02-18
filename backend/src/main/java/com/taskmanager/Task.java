package com.taskmanager;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // FK --> Project.id, not null
    private String projectId;

    // not null
    private String title;

    private String description;

    private String status;
    private String dueDate;

    // FK --> User.userId, nullable
    private Long assignedTo;
}
