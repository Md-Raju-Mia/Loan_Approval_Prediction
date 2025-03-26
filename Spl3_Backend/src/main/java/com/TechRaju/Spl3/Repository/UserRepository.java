package com.TechRaju.Spl3.Repository;

import com.TechRaju.Spl3.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;


public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String email);
}