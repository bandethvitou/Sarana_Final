package com.sarana_NIS.newTown_backend.controller;

import com.sarana_NIS.newTown_backend.dto.response.common.ApiResponse;
import com.sarana_NIS.newTown_backend.model.entity.core.User;
import com.sarana_NIS.newTown_backend.model.enums.UserRole;
import com.sarana_NIS.newTown_backend.repository.UserRepository;
import com.sarana_NIS.newTown_backend.security.annotation.RequiresRole;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@RequiresRole("DIRECTOR")
public class DirectorPortalController {

    private final UserRepository userRepository;

    public DirectorPortalController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // --- USERS ---
    @GetMapping("/users")
    public ResponseEntity<ApiResponse<List<User>>> getAllUsers() {
        return ResponseEntity.ok(ApiResponse.success(userRepository.findAll()));
    }

    @PutMapping("/users/{id}/promote")
    public ResponseEntity<ApiResponse<User>> promoteUser(@PathVariable Long id) {
        User user = userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
        user.setRole(UserRole.MANAGER); // Example: Promote a Teacher to Manager
        userRepository.save(user);
        return ResponseEntity.ok(ApiResponse.success("User promoted to Manager", user));
    }

    @PutMapping("/users/{id}/demote")
    public ResponseEntity<ApiResponse<User>> demoteUser(@PathVariable Long id) {
        User user = userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
        user.setRole(UserRole.TEACHER); // FIXED: Demote to Teacher (since STAFF no longer exists)
        userRepository.save(user);
        return ResponseEntity.ok(ApiResponse.success("User demoted to Teacher", user));
    }

    // --- SETTINGS ---
    @GetMapping("/settings")
    public ResponseEntity<ApiResponse<Map<String, Object>>> getSettings() {
        Map<String, Object> settings = Map.of(
                "schoolName", "NIS International School",
                "academicYear", "2025-2026",
                "semester", "Semester 1",
                "currency", "USD",
                "timezone", "Asia/Phnom_Penh"
        );
        return ResponseEntity.ok(ApiResponse.success(settings));
    }

    // --- AUDIT LOGS ---
    @GetMapping("/logs")
    public ResponseEntity<ApiResponse<List<Map<String, Object>>>> getAuditLogs() {
        List<Map<String, Object>> logs = new ArrayList<>();
        logs.add(Map.of("id", 1, "user", "director@nis.edu", "action", "LOGIN_SUCCESS", "date", "2025-06-25 08:30"));
        logs.add(Map.of("id", 2, "user", "reception@nis.edu", "action", "STUDENT_ENROLLED", "date", "2025-06-25 09:15"));
        return ResponseEntity.ok(ApiResponse.success(logs));
    }

    // --- MEETINGS (Mock) ---
    @GetMapping("/meetings")
    public ResponseEntity<ApiResponse<List<Object>>> getMeetings() {
        return ResponseEntity.ok(ApiResponse.success(new ArrayList<>()));
    }
}