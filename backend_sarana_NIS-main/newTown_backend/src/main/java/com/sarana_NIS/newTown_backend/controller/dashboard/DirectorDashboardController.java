package com.sarana_NIS.newTown_backend.controller.dashboard;

import com.sarana_NIS.newTown_backend.dto.response.common.ApiResponse;
import com.sarana_NIS.newTown_backend.repository.FeeRepository;
import com.sarana_NIS.newTown_backend.repository.GoalRepository;
import com.sarana_NIS.newTown_backend.repository.ReportRepository;
import com.sarana_NIS.newTown_backend.repository.StudentRepository;
import com.sarana_NIS.newTown_backend.security.annotation.RequiresRole;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/director")
@RequiresRole("DIRECTOR")
public class DirectorDashboardController {

    private final FeeRepository feeRepository;
    private final StudentRepository studentRepository;
    private final ReportRepository reportRepository;
    private final GoalRepository goalRepository;

    public DirectorDashboardController(FeeRepository feeRepository, StudentRepository studentRepository, ReportRepository reportRepository, GoalRepository goalRepository) {
        this.feeRepository = feeRepository;
        this.studentRepository = studentRepository;
        this.reportRepository = reportRepository;
        this.goalRepository = goalRepository;
    }

    @GetMapping("/stats")
    public ResponseEntity<ApiResponse<Map<String, Object>>> getDashboardStats() {
        Map<String, Object> stats = new HashMap<>();

        // Real data from DB
        BigDecimal revenue = feeRepository.sumTotalCollected();
        long totalStudents = studentRepository.count();
        long pendingReports = reportRepository.countPendingReports();
        long totalGoals = goalRepository.count();
        long completedGoals = goalRepository.countByStatus(com.sarana_NIS.newTown_backend.model.enums.GoalStatus.COMPLETED);

        stats.put("revenue", revenue != null ? revenue.doubleValue() : 0.0);
        stats.put("expenses", 45000.0); // Hardcoded for Phase 1 (Finance module removed)
        stats.put("profit", revenue != null ? revenue.doubleValue() - 45000.0 : 0.0);
        stats.put("totalStudents", totalStudents);
        stats.put("goalProgress", completedGoals + "/" + totalGoals + " goals on track");
        stats.put("pendingReports", pendingReports);

        return ResponseEntity.ok(ApiResponse.success(stats));
    }

    @GetMapping("/chart-data")
    public ResponseEntity<ApiResponse<List<Map<String, Object>>>> getChartData() {
        // Exact format requested by frontend
        List<Map<String, Object>> chart = new ArrayList<>();
        chart.add(Map.of("month", "Jan", "revenue", 50000, "expenses", 32000, "profit", 18000));
        chart.add(Map.of("month", "Feb", "revenue", 55000, "expenses", 35000, "profit", 20000));
        chart.add(Map.of("month", "Mar", "revenue", 48000, "expenses", 31000, "profit", 17000));
        chart.add(Map.of("month", "Apr", "revenue", 60000, "expenses", 40000, "profit", 20000));
        return ResponseEntity.ok(ApiResponse.success(chart));
    }

    @GetMapping("/target-vs-actual")
    public ResponseEntity<ApiResponse<Map<String, Object>>> getTargetVsActual() {
        Map<String, Object> data = new HashMap<>();
        data.put("targetRevenue", 55000);
        data.put("actualRevenue", 50000);
        data.put("forecastRevenue", 58000);
        return ResponseEntity.ok(ApiResponse.success(data));
    }

    @GetMapping("/submissions")
    public ResponseEntity<ApiResponse<List<Map<String, Object>>>> getTopManagerSubmissions() {
        // Fetching actual reports from DB that are pending
        List<Map<String, Object>> submissions = new ArrayList<>();
        reportRepository.findPendingReview().forEach(report -> {
            submissions.add(Map.of(
                    "id", report.getId(),
                    "title", report.getTitle(),
                    "submittedBy", report.getSubmittedBy() != null ? report.getSubmittedBy().getFullName() : "Top Manager",
                    "status", report.getStatus().name().toLowerCase()
            ));
        });
        return ResponseEntity.ok(ApiResponse.success(submissions));
    }
}