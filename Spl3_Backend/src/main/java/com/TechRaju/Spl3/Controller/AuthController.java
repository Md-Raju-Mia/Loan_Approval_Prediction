package com.TechRaju.Spl3.Controller;

import com.TechRaju.Spl3.Entity.User;
import com.TechRaju.Spl3.Entity.VerifyLogin;
import com.TechRaju.Spl3.Entity.VerifyRequest;
import com.TechRaju.Spl3.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class AuthController {
    @Autowired
    private UserService userService;

    @PostMapping("/signup")
    public String signup(@RequestBody User user) {
        userService.signup(user);
        String otp = userService.generateOtp();
        // Send OTP to user's email (implementation not shown)
        return "{\"success\": true}";
    }

    @PostMapping("/verify")
    public String verify(@RequestBody VerifyRequest verifyRequest) {
        boolean isVerified = userService.verifyOtp(verifyRequest.getEmail(), verifyRequest.getOtp());
        if (isVerified) {
            return "{\"success\": true}";
        }
        return "{\"success\": false}";
    }

    @PostMapping("/login")
    public String login(@RequestBody VerifyLogin verifyLogin) {
        User user = userService.login(verifyLogin.getEmail(), verifyLogin.getPassword());
        if (user != null) {
            return "{\"success\": true, \"message\":\"Login Successful\"}";
        }
        return "{\"success\": false, \"message\":\"Login Failed: Invalid email or password\"}";
    }


//    @PostMapping("/login")
//    public Map<String, Object> login(@RequestBody VerifyLogin verifyLogin) {
//        User user = userService.login(verifyLogin.getEmail(), verifyLogin.getPassword());
//        Map<String, Object> response = new HashMap<>();
//
//        if (user != null) {
//            response.put("success", true);
//            response.put("message", "Login Successful");
//        } else {
//            response.put("success", false);
//            response.put("message", "Login Failed: Invalid email or password");
//        }
//
//        return response;
//    }
}