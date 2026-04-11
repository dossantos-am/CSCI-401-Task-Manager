package com.taskmanager.service;

public interface EmailService {
    void sendPasswordResetEmail(String to, String resetLink);
    void sendProjectInviteEmail(String to, String projectName, String inviterName);
}
