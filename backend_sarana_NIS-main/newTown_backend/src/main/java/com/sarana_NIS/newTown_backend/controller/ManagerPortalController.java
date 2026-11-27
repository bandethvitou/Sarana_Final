package com.sarana_NIS.newTown_backend.controller;

import com.sarana_NIS.newTown_backend.dto.response.common.ApiResponse;
import com.sarana_NIS.newTown_backend.model.enums.UserRole;
import com.sarana_NIS.newTown_backend.repository.StudentRepository;
import com.sarana_NIS.newTown_backend.repository.UserRepository;
import com.sarana_NIS.newTown_backend.security.annotation.RequiresRole;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/manager")
@RequiresRole("MANAGER")
public class ManagerPortalController {

    private final StudentRepository studentRepository;
    private final UserRepository userRepository;

    public ManagerPortalController(StudentRepository studentRepository, UserRepository userRepository) {
        this.studentRepository = studentRepository;
        this.userRepository = userRepository;
    }

    // ============================================================
    // 1. DYNAMIC DASHBOARD (3 Types)
    // ============================================================
    @GetMapping("/stats")
    public ResponseEntity<ApiResponse<Map<String, Object>>> getManagerStats(@RequestParam(required = false) String managerType) {
        Map<String, Object> stats = new HashMap<>();

        if ("Action".equalsIgnoreCase(managerType)) {
            // Action Manager KPI
            stats.put("staffRequests", 4);
            stats.put("openProposals", 2);
            stats.put("budgetUsed", 1200);
        } else if ("Rule".equalsIgnoreCase(managerType) || "Rule & Law".equalsIgnoreCase(managerType)) {
            // Rule & Law Manager KPI
            stats.put("disciplineCases", 3);
            stats.put("staffAttendance", 95);
            stats.put("lateArrivals", 2);
        } else {
            // Default: Education Manager KPI
            stats.put("studentsInDept", studentRepository.count());
            stats.put("atRiskStudents", 12);
            stats.put("pendingFees", 5);
            stats.put("avgClassScore", 78.5);
        }

        return ResponseEntity.ok(ApiResponse.success(stats));
    }

    // ============================================================
    // 2. MY TEAM
    // ============================================================
    @GetMapping("/team")
    public ResponseEntity<ApiResponse<List<Map<String, Object>>>> getMyTeam() {
        // Fetching real teachers from the database
        var teachers = userRepository.findByRole(UserRole.TEACHER);
        List<Map<String, Object>> team = new ArrayList<>();

        for (var t : teachers) {
            team.add(Map.of(
                    "id", t.getId(),
                    "name", t.getFullName(),
                    "email", t.getEmail(),
                    "role", "TEACHER",
                    "status", "ACTIVE"
            ));
        }
        return ResponseEntity.ok(ApiResponse.success(team));
    }

    // ============================================================
    // 3. LEAVE REQUESTS (Mocked - Phase 2 HR)
    // ============================================================
    @GetMapping("/leaves")
    public ResponseEntity<ApiResponse<List<Object>>> getLeaves() {
        return ResponseEntity.ok(ApiResponse.success(new ArrayList<>()));
    }

    @PutMapping("/leaves/{id}/approve")
    public ResponseEntity<ApiResponse<String>> approveLeave(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success("Leave approved successfully", null));
    }

    @PutMapping("/leaves/{id}/deny")
    public ResponseEntity<ApiResponse<String>> denyLeave(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success("Leave denied successfully", null));
    }

    // ============================================================
    // 4. HIRING REQUESTS (Mocked - Phase 2 HR)
    // ============================================================
    @PostMapping("/hiring")
    public ResponseEntity<ApiResponse<Map<String, Object>>> createHiring(@RequestBody Map<String, Object> payload) {
        return ResponseEntity.ok(ApiResponse.success("Hiring request submitted", Map.of("status", "PENDING")));
    }

    // ============================================================
    // 5. PROPOSALS (Mocked for UI)
    // ============================================================
    @PostMapping("/proposals")
    public ResponseEntity<ApiResponse<Map<String, Object>>> createProposal(@RequestBody Map<String, Object> payload) {
        return ResponseEntity.ok(ApiResponse.success("Proposal submitted to Director", Map.of("status", "PENDING")));
    }

    // ============================================================
    // 6. STAFF REPORTS
    // ============================================================
    @GetMapping("/staff-reports")
    public ResponseEntity<ApiResponse<List<Map<String, Object>>>> getStaffReports() {
        List<Map<String, Object>> reports = List.of(
                Map.of("id", 101, "title", "Student Misbehavior", "submittedBy", "Teacher Vann", "status", "PENDING")
        );
        return ResponseEntity.ok(ApiResponse.success(reports));
    }

    @PutMapping("/staff-reports/{id}/review")
    public ResponseEntity<ApiResponse<String>> reviewStaffReport(@PathVariable Long id, @RequestBody Map<String, String> payload) {
        String status = payload.get("status"); // approved or revision_requested
        return ResponseEntity.ok(ApiResponse.success("Report marked as " + status, null));
    }

    // ============================================================
    // 7. MY REPORTS (To Top Manager)
    // ============================================================
    @PostMapping("/reports")
    public ResponseEntity<ApiResponse<String>> submitReport(@RequestBody Map<String, Object> payload) {
        return ResponseEntity.ok(ApiResponse.success("Report submitted to Top Manager", null));
    }

    // ============================================================
    // 8. MEETINGS (Mocked)
    // ============================================================
    @GetMapping("/meetings")
    public ResponseEntity<ApiResponse<List<Object>>> getMeetings() {
        return ResponseEntity.ok(ApiResponse.success(new ArrayList<>()));
    }
}