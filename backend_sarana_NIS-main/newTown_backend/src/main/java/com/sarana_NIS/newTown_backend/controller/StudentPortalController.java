package com.sarana_NIS.newTown_backend.controller;

import com.sarana_NIS.newTown_backend.dto.response.common.ApiResponse;
import com.sarana_NIS.newTown_backend.security.annotation.RequiresRole;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/student")
@RequiresRole("STUDENT")
public class StudentPortalController {

    // 1. Dashboard Stats
    @GetMapping("/dashboard/stats")
    public ResponseEntity<ApiResponse<Map<String, Object>>> getDashboardStats() {
        Map<String, Object> stats = new HashMap<>();
        stats.put("avgScore", 85.5);
        stats.put("attendanceRate", 96.2);
        stats.put("pendingHomeworkCount", 2);
        return ResponseEntity.ok(ApiResponse.success(stats));
    }

    // 2. Today's Schedule
    @GetMapping("/schedule/today")
    public ResponseEntity<ApiResponse<List<Map<String, Object>>>> getTodaySchedule() {
        List<Map<String, Object>> schedule = List.of(
                Map.of("time", "08:00 - 09:30", "subject", "Mathematics", "teacher", "Mr. Vann", "room", "Room 5A"),
                Map.of("time", "10:00 - 11:30", "subject", "Science", "teacher", "Ms. Ly", "room", "Lab 1")
        );
        return ResponseEntity.ok(ApiResponse.success(schedule));
    }

    // 3. Academics
    @GetMapping("/scores")
    public ResponseEntity<ApiResponse<List<Map<String, Object>>>> getScores() {
        List<Map<String, Object>> scores = List.of(
                Map.of("subject", "Mathematics", "score", 92, "grade", "A", "term", "Term 1"),
                Map.of("subject", "Science", "score", 85, "grade", "B", "term", "Term 1")
        );
        return ResponseEntity.ok(ApiResponse.success(scores));
    }

    @GetMapping("/attendance")
    public ResponseEntity<ApiResponse<List<Map<String, Object>>>> getAttendance() {
        List<Map<String, Object>> attendance = List.of(
                Map.of("date", "2025-06-01", "status", "PRESENT"),
                Map.of("date", "2025-06-02", "status", "PRESENT"),
                Map.of("date", "2025-06-03", "status", "LATE")
        );
        return ResponseEntity.ok(ApiResponse.success(attendance));
    }

    @GetMapping("/homework")
    public ResponseEntity<ApiResponse<List<Map<String, Object>>>> getHomework() {
        List<Map<String, Object>> homework = List.of(
                Map.of("id", 1, "subject", "Mathematics", "title", "Page 45 Ex 2", "dueDate", "2025-06-28", "status", "PENDING"),
                Map.of("id", 2, "subject", "Science", "title", "Lab Report", "dueDate", "2025-06-29", "status", "PENDING")
        );
        return ResponseEntity.ok(ApiResponse.success(homework));
    }

    @PostMapping("/homework/{id}/submit")
    public ResponseEntity<ApiResponse<String>> submitHomework(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success("Homework submitted successfully", null));
    }

    // 4. Events & Gallery
    @GetMapping("/calendar")
    public ResponseEntity<ApiResponse<List<Object>>> getCalendar() {
        return ResponseEntity.ok(ApiResponse.success(new ArrayList<>()));
    }

    @GetMapping("/gallery")
    public ResponseEntity<ApiResponse<List<Object>>> getGallery() {
        return ResponseEntity.ok(ApiResponse.success(new ArrayList<>()));
    }
}