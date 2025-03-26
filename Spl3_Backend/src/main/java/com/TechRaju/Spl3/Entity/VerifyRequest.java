package com.TechRaju.Spl3.Entity;

public class VerifyRequest {

    private String email;
    private String otp;

    public String getEmail(){
        return email;
    }

    public String getOtp() {
        return otp;
    }

    public void setOtp(String otp) {
        this.otp = otp;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
