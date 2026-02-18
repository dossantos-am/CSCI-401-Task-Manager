package com.taskmanager;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String desecription;
    private String startDate;
    private String dueDate;
    private String status;
    private String createdBy;
    private String createdAt;

    // constructors, getters, and setters

}
