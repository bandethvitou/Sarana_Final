package com.sarana_NIS.newTown_backend.controller;

import com.sarana_NIS.newTown_backend.dto.response.common.ApiResponse;
import com.sarana_NIS.newTown_backend.model.entity.admissions.Visitor;
import com.sarana_NIS.newTown_backend.model.enums.UserRole;
import com.sarana_NIS.newTown_backend.model.enums.VisitorStatus;
import com.sarana_NIS.newTown_backend.repository.StudentRepository;
import com.sarana_NIS.newTown_backend.repository.UserRepository;
import com.sarana_NIS.newTown_backend.repository.VisitorRepository;
import com.sarana_NIS.newTown_backend.security.annotation.RequiresRole;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/reception")
@RequiresRole("RECEPTIONIST")
public class ReceptionPortalController {

    private final VisitorRepository visitorRepository;
    private final StudentRepository studentRepository;
    private final UserRepository userRepository;

    public ReceptionPortalController(VisitorRepository visitorRepository, StudentRepository studentRepository, UserRepository userRepository) {
        this.visitorRepository = visitorRepository;
        this.studentRepository = studentRepository;
        this.userRepository = userRepository;
    }

    // ============================================================
    // 1. HOME DASHBOARD KPIs & LISTS
    // ============================================================
    @GetMapping("/home-stats")
    public ResponseEntity<ApiResponse<Map<String, Object>>> getHomeStats() {
        Map<String, Object> stats = new HashMap<>();
        stats.put("checkedInToday", 45); // Mocked
        stats.put("visitorsToday", visitorRepository.count());
        stats.put("pendingTasks", 3); // Mocked
        return ResponseEntity.ok(ApiResponse.success(stats));
    }

    @GetMapping("/todos")
    public ResponseEntity<ApiResponse<List<Map<String, Object>>>> getTodos() {
        List<Map<String, Object>> todos = List.of(
                Map.of("id", 1, "task", "Call Parent Mr. Heng", "status", "PENDING"),
                Map.of("id", 2, "task", "Print Grade 5 Report Cards", "status", "PENDING")
        );
        return ResponseEntity.ok(ApiResponse.success(todos));
    }

    @GetMapping("/leads")
    public ResponseEntity<ApiResponse<List<Map<String, Object>>>> getLeads() {
        List<Map<String, Object>> leads = List.of(
                Map.of("id", 1, "parentName", "Mrs. Sok", "phone", "098765432", "interestLevel", "HIGH")
        );
        return ResponseEntity.ok(ApiResponse.success(leads));
    }

    // ============================================================
    // 2. CHECK-IN / CHECK-OUT
    // ============================================================
    @PostMapping("/checkin")
    public ResponseEntity<ApiResponse<String>> checkInStudent(@RequestBody Map<String, Object> payload) {
        // Real DB logic for StudentCheckin would go here
        return ResponseEntity.ok(ApiResponse.success("Student checked in successfully", null));
    }

    // ============================================================
    // 3. VISITOR LOG (Real Database)
    // ============================================================
    @GetMapping("/visitors")
    public ResponseEntity<ApiResponse<List<Visitor>>> getVisitors() {
        return ResponseEntity.ok(ApiResponse.success(visitorRepository.findAll()));
    }

    @PostMapping("/visitors")
    public ResponseEntity<ApiResponse<Visitor>> logVisitor(@RequestBody Map<String, String> payload) {
        Visitor visitor = new Visitor();
        visitor.setName(payload.get("name"));
        visitor.setPhone(payload.get("phone"));
        visitor.setPurpose(payload.get("purpose"));
        visitor.setOrganization(payload.get("organization"));
        visitor.setCheckIn(LocalDateTime.now());
        visitor.setStatus(VisitorStatus.ACTIVE);
        visitor.setPassNumber("VIS-" + UUID.randomUUID().toString().substring(0, 5).toUpperCase());

        Visitor saved = visitorRepository.save(visitor);
        return ResponseEntity.ok(ApiResponse.success("Visitor logged", saved));
    }

    @PutMapping("/visitors/{id}/checkout")
    public ResponseEntity<ApiResponse<Visitor>> checkoutVisitor(@PathVariable Long id) {
        Visitor visitor = visitorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Visitor not found"));

        visitor.setCheckOut(LocalDateTime.now());
        visitor.setStatus(VisitorStatus.CHECKED_OUT);
        Visitor saved = visitorRepository.save(visitor);

        return ResponseEntity.ok(ApiResponse.success("Visitor checked out", saved));
    }

    // ============================================================
    // 4. CONTACT DIRECTORY
    // ============================================================
    @GetMapping("/contacts")
    public ResponseEntity<ApiResponse<List<Map<String, Object>>>> getContacts() {
        // Fetching real users from the database to populate the directory
        List<Map<String, Object>> contacts = new ArrayList<>();
        var users = userRepository.findAll();

        for (var u : users) {
            if (u.getRole() != UserRole.STUDENT && u.getRole() != UserRole.PARENT) {
                contacts.add(Map.of(
                        "id", u.getId(),
                        "name", u.getFullName(),
                        "phone", u.getPhone() != null ? u.getPhone() : "N/A",
                        "department", u.getRole().name()
                ));
            }
        }
        return ResponseEntity.ok(ApiResponse.success(contacts));
    }

    // ============================================================
    // 5. DAILY REPORTS & REQUESTS
    // ============================================================
    @PostMapping("/daily-report")
    public ResponseEntity<ApiResponse<String>> submitDailyReport(@RequestBody Map<String, Object> payload) {
        return ResponseEntity.ok(ApiResponse.success("Daily report submitted to Manager", null));
    }

    @PostMapping("/requests")
    public ResponseEntity<ApiResponse<String>> submitStaffRequest(@RequestBody Map<String, Object> payload) {
        return ResponseEntity.ok(ApiResponse.success("Maintenance request logged", null));
    }
}