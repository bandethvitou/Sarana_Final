package com.sarana_NIS.newTown_backend.controller.dashboard;

import com.sarana_NIS.newTown_backend.dto.response.common.ApiResponse;
import com.sarana_NIS.newTown_backend.model.enums.UserRole;
import com.sarana_NIS.newTown_backend.repository.ReportRepository;
import com.sarana_NIS.newTown_backend.repository.StudentRepository;
import com.sarana_NIS.newTown_backend.repository.UserRepository;
import com.sarana_NIS.newTown_backend.security.annotation.RequiresRole;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/top-manager")
@RequiresRole("TOP_MANAGER")
public class TopManagerDashboardController {

    private final UserRepository userRepository;
    private final StudentRepository studentRepository;
    private final ReportRepository reportRepository;

    public TopManagerDashboardController(UserRepository userRepository, StudentRepository studentRepository, ReportRepository reportRepository) {
        this.userRepository = userRepository;
        this.studentRepository = studentRepository;
        this.reportRepository = reportRepository;
    }

    @GetMapping("/stats")
    public ResponseEntity<ApiResponse<Map<String, Object>>> getStats() {
        Map<String, Object> stats = new HashMap<>();

        long activeManagers = userRepository.findByRole(UserRole.MANAGER).size();
        long totalStudents = studentRepository.count();
        long pendingReviews = reportRepository.countPendingReports();

        stats.put("activeManagers", activeManagers);
        stats.put("pendingReviews", pendingReviews);
        stats.put("totalStudents", totalStudents);
        stats.put("dropouts", 12); // Mocked for Phase 1
        stats.put("netGrowth", 45); // Mocked for Phase 1
        stats.put("openTasks", 8); // Mocked for Phase 1

        return ResponseEntity.ok(ApiResponse.success(stats));
    }

    @GetMapping("/enrollment")
    public ResponseEntity<ApiResponse<List<Map<String, Object>>>> getEnrollmentByLevel() {
        // Frontend asked for: Baby, Kids, Junior, Senior
        List<Map<String, Object>> data = new ArrayList<>();
        data.add(Map.of("level", "Baby", "count", 120));
        data.add(Map.of("level", "Kids", "count", 340));
        data.add(Map.of("level", "Junior", "count", 250));
        data.add(Map.of("level", "Senior", "count", 180));
        return ResponseEntity.ok(ApiResponse.success(data));
    }

    @GetMapping("/pending-reports")
    public ResponseEntity<ApiResponse<List<Object>>> getPendingReports() {
        List<Object> reports = new ArrayList<>(reportRepository.findPendingReview());
        return ResponseEntity.ok(ApiResponse.success(reports));
    }
}