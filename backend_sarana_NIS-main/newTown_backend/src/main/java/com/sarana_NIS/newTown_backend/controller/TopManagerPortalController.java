package com.sarana_NIS.newTown_backend.controller;

import com.sarana_NIS.newTown_backend.dto.response.common.ApiResponse;
import com.sarana_NIS.newTown_backend.model.enums.UserRole;
import com.sarana_NIS.newTown_backend.repository.UserRepository;
import com.sarana_NIS.newTown_backend.security.annotation.RequiresRole;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/top-manager")
@RequiresRole("TOP_MANAGER")
public class TopManagerPortalController {

    private final UserRepository userRepository;

    public TopManagerPortalController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping("/managers")
    public ResponseEntity<ApiResponse<List<Map<String, Object>>>> getManagers() {
        // Fetching real managers from DB
        var managers = userRepository.findByRole(UserRole.MANAGER);
        List<Map<String, Object>> response = new ArrayList<>();

        for (var m : managers) {
            response.add(Map.of(
                    "id", m.getId(),
                    "name", m.getFullName(),
                    "email", m.getEmail(),
                    "teamSize", 8, // Mocked
                    "performanceScore", 92.5 // Mocked
            ));
        }
        return ResponseEntity.ok(ApiResponse.success(response));
    }

    @GetMapping("/staff-requests")
    public ResponseEntity<ApiResponse<List<Map<String, Object>>>> getStaffRequests() {
        List<Map<String, Object>> requests = List.of(
                Map.of("id", 1, "staff", "Maintenance Team", "type", "REPAIR", "item", "Air Conditioner", "priority", "HIGH", "status", "PENDING"),
                Map.of("id", 2, "staff", "IT Support", "type", "SOFTWARE", "item", "Projector App", "priority", "MEDIUM", "status", "PENDING")
        );
        return ResponseEntity.ok(ApiResponse.success(requests));
    }

    @PutMapping("/staff-requests/{id}/approve")
    public ResponseEntity<ApiResponse<String>> approveStaffRequest(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success("Request approved", null));
    }

    @GetMapping("/reviews")
    public ResponseEntity<ApiResponse<List<Map<String, Object>>>> getReviews() {
        List<Map<String, Object>> reviews = List.of(
                Map.of("id", 101, "title", "Q1 Education Report", "submittedBy", "Manager Ly", "status", "PENDING")
        );
        return ResponseEntity.ok(ApiResponse.success(reviews));
    }

    @PutMapping("/reviews/{id}/approve")
    public ResponseEntity<ApiResponse<String>> approveReview(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success("Report approved", null));
    }

    @PutMapping("/reviews/{id}/escalate")
    public ResponseEntity<ApiResponse<String>> escalateReview(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success("Report escalated to Director", null));
    }

    @GetMapping("/score-sheets")
    public ResponseEntity<ApiResponse<List<Map<String, Object>>>> getScoreSheets() {
        return ResponseEntity.ok(ApiResponse.success(new ArrayList<>()));
    }

    @PostMapping("/bulk-import")
    public ResponseEntity<ApiResponse<String>> bulkImportScores() {
        // File parsing will be built in Phase 2
        return ResponseEntity.ok(ApiResponse.success("Excel file imported successfully", null));
    }
}