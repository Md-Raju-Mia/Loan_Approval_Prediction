package com.TechRaju.Spl3.Service;

import com.TechRaju.Spl3.EmailService.EmailService;
import com.TechRaju.Spl3.Entity.User;
import com.TechRaju.Spl3.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Random;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EmailService emailService;

    @Autowired // Inject the PasswordEncoder bean
    private PasswordEncoder passwordEncoder;

    public void signup(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword())); // Hash the password
        String otp = generateOtp();
        user.setOtp(otp); // Save the OTP
        userRepository.save(user);

        // Send OTP via email
        emailService.sendOtpEmail(user.getEmail(), otp);
    }

    public String generateOtp() {
        Random random = new Random();
        int otp = 100000 + random.nextInt(900000); // Generates a 6-digit OTP
        return String.valueOf(otp);
    }

    public boolean verifyOtp(String email, String otp) {
        // Find the user by email
        User user = userRepository.findByEmail(email);

        // Check if the user exists and the OTP matches
        if (user != null && otp.equals(user.getOtp())) {
            user.setVerified(true); // Mark the user as verified
            userRepository.save(user); // Save the updated user
            return true; // OTP verification successful
        }

        return false; // OTP verification failed
    }

    public User login(String email, String password) {
        User user = userRepository.findByEmail(email);
        if (user != null && passwordEncoder.matches(password, user.getPassword()) && user.isVerified()) {
            return user; // Login successful
        }
        return null; // Login failed
    }
}