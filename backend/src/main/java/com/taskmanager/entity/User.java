package com.taskmanager.entity;

import jakarta.persistence.*;

@Entity
@Table(name="users")
public class User {

    @Id
    @Column(name = "user_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;    // User.userId (PK)
    
    @Column(name = "first_name", nullable = false)
    private String firstName;

    @Column(name = "last_name", nullable = false)
    private String lastName;

    @Column(name = "email_address", nullable = false, unique = true)
    private String emailAddress;

    @Column(name = "hashed_password", nullable = false, unique = false)
    private String hashedPassword;

    public User() {}

    // Curious if I need to add another paramater for Long userId?
    public User(Long userId, String firstName, String lastName, String emailAddress) {
        this.userId = userId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.emailAddress = emailAddress;
    }

    // Getters
    public Long getUserId() { return userId; }
    public String getFirstName() { return firstName; }
    public String getLastName() { return lastName; }
    public String getEmailAddress() { return emailAddress; }
    public String getHashedPassword() { return hashedPassword; }

    // Setters
    public void setFirstName(String firstName) { this.firstName = firstName; }
    public void setLastName(String lastName) { this.lastName = lastName; }
    public void setEmailAddress(String emailAddress) { this.emailAddress = emailAddress; }
    public void setHashedPassword(String hashedPassword) { this.hashedPassword = hashedPassword; }
}