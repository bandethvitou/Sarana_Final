package com.sarana_NIS.newTown_backend.config;

import com.sarana_NIS.newTown_backend.model.entity.core.User;
import com.sarana_NIS.newTown_backend.model.enums.UserRole;
import com.sarana_NIS.newTown_backend.model.enums.UserStatus;
import com.sarana_NIS.newTown_backend.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public DataInitializer(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        if (userRepository.count() > 0) {
            System.out.println("========================================");
            System.out.println("✅ Users already exist: " + userRepository.count());
            System.out.println("========================================");
            return;
        }

        System.out.println("========================================");
        System.out.println("📦 Creating 7 Phase-1 users...");
        System.out.println("========================================");

        createUser("director@nis.edu",   "B.", "Soth",    "director123",   UserRole.DIRECTOR);
        createUser("topmanager@nis.edu", "T.", "Manager", "topmanager123", UserRole.TOP_MANAGER);
        createUser("manager@nis.edu",    "M.", "Ly",      "manager123",    UserRole.MANAGER);
        createUser("reception@nis.edu",  "R.", "Recept",  "reception123",  UserRole.RECEPTIONIST);
        createUser("teacher@nis.edu",    "T.", "Eacher",  "teacher123",    UserRole.TEACHER);
        createUser("student@nis.edu",    "S.", "Tudent",  "student123",    UserRole.STUDENT);
        createUser("parent@nis.edu",     "P.", "Arent",   "parent123",     UserRole.PARENT);

        System.out.println("========================================");
        System.out.println("🎉 Seeded 7 users successfully!");
        System.out.println("========================================");
    }

    private void createUser(String email, String firstName, String lastName,
                            String password, UserRole role) {
        try {
            User user = new User();
            user.setUsername(email);
            user.setEmail(email);
            user.setFirstName(firstName);
            user.setLastName(lastName);
            user.setPasswordHash(passwordEncoder.encode(password));
            user.setRole(role);
            user.setUserStatus(UserStatus.ACTIVE);
            user.setIsEmailVerified(true);
            user.setAccountLocked(false);
            user.setFailedLoginAttempts(0);

            userRepository.save(user);
            System.out.println("✅ Created: " + email + " (" + role + ") / password: " + password);
        } catch (Exception e) {
            System.err.println("❌ Failed to create " + email + ": " + e.getMessage());
        }
    }
}