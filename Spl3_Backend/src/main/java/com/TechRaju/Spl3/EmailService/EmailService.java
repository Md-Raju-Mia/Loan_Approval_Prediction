package com.TechRaju.Spl3.EmailService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendOtpEmail(String toEmail, String otp) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("raju.iit.nstu1@gmail.com"); // Set the sender's email address explicitly
        message.setTo(toEmail);
        message.setSubject("Your OTP for Verification");
        message.setText("Your OTP is: " + otp);

        mailSender.send(message);
    }
}
