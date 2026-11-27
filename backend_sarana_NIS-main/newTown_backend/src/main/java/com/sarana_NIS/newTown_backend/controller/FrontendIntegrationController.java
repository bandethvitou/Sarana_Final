package com.sarana_NIS.newTown_backend.controller;

import com.sarana_NIS.newTown_backend.dto.response.common.ApiResponse;
import com.sarana_NIS.newTown_backend.model.entity.core.User;
import com.sarana_NIS.newTown_backend.repository.UserRepository;
import com.sarana_NIS.newTown_backend.repository.StudentRepository;
import com.sarana_NIS.newTown_backend.repository.FeeRepository;
import com.sarana_NIS.newTown_backend.security.annotation.RequiresRole;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.*;

@RestController
@RequestMapping("/api")
public class FrontendIntegrationController {

    private final UserRepository userRepository;
    private final StudentRepository studentRepository;
    private final FeeRepository feeRepository;

    public FrontendIntegrationController(UserRepository userRepository, StudentRepository studentRepository, FeeRepository feeRepository) {
        this.userRepository = userRepository;
        this.studentRepository = studentRepository;
        this.feeRepository = feeRepository;
    }

    // ============================================================
    // 👑 1. DIRECTOR ROLE
    // ============================================================

    @GetMapping("/director/stats")
    @RequiresRole("DIRECTOR")
    public ResponseEntity<ApiResponse<Map<String, Object>>> getDirectorStats() {
        Map<String, Object> stats = new HashMap<>();
        // Using real data where possible, hardcoding the rest
        BigDecimal revenue = feeRepository.sumTotalCollected();
        stats.put("revenue", revenue != null ? revenue : 0.0);
        stats.put("expenses", 15000.0); // Placeholder
        stats.put("profit", revenue != null ? revenue.doubleValue() - 15000.0 : 0.0);
        stats.put("pendingReports", 5); // Placeholder
        return ResponseEntity.ok(ApiResponse.success(stats));
    }

    @GetMapping("/director/chart-data")
    @RequiresRole("DIRECTOR")
    public ResponseEntity<ApiResponse<List<Map<String, Object>>>> getDirectorChart() {
        List<Map<String, Object>> chart = new ArrayList<>();
        chart.add(Map.of("month", "Jan", "revenue", 38000, "expenses", 28000));
        chart.add(Map.of("month", "Feb", "revenue", 42000, "expenses", 31000));
        chart.add(Map.of("month", "Mar", "revenue", 45000, "expenses", 30000));
        return ResponseEntity.ok(ApiResponse.success(chart));
    }

    // ============================================================
    // 📊 2. TOP MANAGER ROLE
    // ============================================================

    @GetMapping("/top-manager/stats")
    @RequiresRole("TOP_MANAGER")
    public ResponseEntity<ApiResponse<Map<String, Object>>> getTopManagerStats() {
        Map<String, Object> stats = new HashMap<>();
        stats.put("activeManagers", 3);
        stats.put("pendingReviews", 12);
        stats.put("totalStudents", studentRepository.count());
        stats.put("openTasks", 8);
        return ResponseEntity.ok(ApiResponse.success(stats));
    }

    @GetMapping("/top-manager/enrollment-chart")
    @RequiresRole("TOP_MANAGER")
    public ResponseEntity<ApiResponse<List<Map<String, Object>>>> getTopManagerChart() {
        List<Map<String, Object>> chart = new ArrayList<>();
        chart.add(Map.of("level", "Grade 1-5", "current", 520, "new", 45, "dropouts", 18));
        chart.add(Map.of("level", "Grade 6-12", "current", 840, "new", 60, "dropouts", 12));
        return ResponseEntity.ok(ApiResponse.success(chart));
    }

    // ============================================================
    // 👔 3. MANAGER ROLE
    // ============================================================

    @GetMapping("/manager/stats")
    @RequiresRole("MANAGER")
    public ResponseEntity<ApiResponse<Map<String, Object>>> getManagerStats(@RequestParam(required = false) String managerType) {
        Map<String, Object> stats = new HashMap<>();
        if ("Action".equalsIgnoreCase(managerType)) {
            stats.put("staffRequests", 4);
            stats.put("openProposals", 2);
            stats.put("budgetUsed", 1200);
        } else if ("Rule".equalsIgnoreCase(managerType)) {
            stats.put("disciplineCases", 3);
            stats.put("staffAttendance", 95);
            stats.put("lateArrivals", 2);
        } else { // Default to Education
            stats.put("studentsInDept", studentRepository.count());
            stats.put("atRiskStudents", 12);
            stats.put("avgClassScore", 78.5);
        }
        return ResponseEntity.ok(ApiResponse.success(stats));
    }

    @GetMapping("/manager/leaves")
    @RequiresRole("MANAGER")
    public ResponseEntity<ApiResponse<List<Object>>> getManagerLeaves() {
        // HR domain was deleted. Returning empty list so UI doesn't crash.
        return ResponseEntity.ok(ApiResponse.success(new ArrayList<>()));
    }

    @PostMapping("/manager/hiring")
    @RequiresRole("MANAGER")
    public ResponseEntity<ApiResponse<Map<String, Object>>> createHiringRequest(@RequestBody Map<String, Object> payload) {
        // Mock success response
        return ResponseEntity.ok(ApiResponse.success("Hiring request sent to Top Manager", Map.of("requestId", 101, "status", "PENDING")));
    }

    // ============================================================
    // 🔔 8. GLOBAL NOTIFICATIONS & MESSAGES
    // ============================================================

    @GetMapping("/notifications")
    @RequiresRole({"DIRECTOR", "TOP_MANAGER", "MANAGER", "RECEPTIONIST", "TEACHER", "STUDENT", "PARENT"})
    public ResponseEntity<ApiResponse<List<Map<String, Object>>>> getRecentNotifications() {
        List<Map<String, Object>> notifications = List.of(
                Map.of("id", 1, "title", "Welcome", "message", "System updated to Phase 1", "isRead", false),
                Map.of("id", 2, "title", "Fee Alert", "message", "3 students have overdue fees", "isRead", false)
        );
        return ResponseEntity.ok(ApiResponse.success(notifications));
    }

    @GetMapping("/messages/conversations")
    @RequiresRole({"DIRECTOR", "TOP_MANAGER", "MANAGER", "RECEPTIONIST", "TEACHER", "STUDENT", "PARENT"})
    public ResponseEntity<ApiResponse<List<Object>>> getConversations() {
        return ResponseEntity.ok(ApiResponse.success(new ArrayList<>())); // Empty chat for now
    }
}