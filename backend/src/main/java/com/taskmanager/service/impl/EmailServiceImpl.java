package com.taskmanager.service.impl;

import com.taskmanager.service.EmailService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

@Service
public class EmailServiceImpl implements EmailService {

    private final JavaMailSender mailSender;

    @Value("${app.mail.from}")
    private String fromAddress;

    public EmailServiceImpl(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    private void sendEmail(String to, String subject, String htmlBody) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, "utf-8");
            helper.setFrom(fromAddress);
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(htmlBody, true);
            mailSender.send(message);
        } catch (MessagingException e) {
            throw new RuntimeException("Failed to send email to " + to, e);
        }
    }

    @Override
    public void sendPasswordResetEmail(String to, String resetLink) {
        String subject = "Reset your password";
        String body = "<p>You requested a password reset.</p>"
                + "<p><a href=\"" + resetLink + "\">Click here to reset your password</a></p>"
                + "<p>This link expires in 1 hour. If you did not request this, ignore this email.</p>";
        sendEmail(to, subject, body);
    }

    @Override
    public void sendProjectInviteEmail(String to, String projectName, String inviterName) {
        String subject = "You've been added to a project";
        String body = "<p><strong>" + inviterName + "</strong> added you to the project <strong>"
                + projectName + "</strong>.</p>"
                + "<p>Log in to view it.</p>";
        sendEmail(to, subject, body);
    }
}
