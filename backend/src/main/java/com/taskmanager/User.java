package com.taskmanager;

import jakarta.persistence.*;

@Entity
@Table(name="users")
public class User {

    @Id
    @Column(name = "user_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;    // User.userId (PK)
    
    private String name;

    @Column(name = "email_address", nullable = false, unique = true)
    private String emailAddress;

    @Column(name = "hashed_password", nullable = false, unique = false)
    private String hashedPassword;

    public User() {}

    public User(String name, String emailAddress, String hashedPassword) {
        this.name = name;
        this.emailAddress = emailAddress;
        this.hashedPassword = hashedPassword;
    }

    // Getters
    public Long getUserId() { return userId; }
    public String getName() { return name; }
    public String getEmailAddress() { return emailAddress; }
    public String getHashedPassword() { return hashedPassword; }

    // Setters
    public void setName(String name) { this.name = name; }
    public void setEmailAddress(String emailAddress) { this.emailAddress = emailAddress; }
    public void setHashedPassword(String hashedPassword) { this.hashedPassword = hashedPassword; }
}