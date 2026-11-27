package com.sarana_NIS.newTown_backend.controller.student;

import com.sarana_NIS.newTown_backend.dto.response.common.ApiResponse;
import com.sarana_NIS.newTown_backend.security.annotation.RequiresRole;
import com.sarana_NIS.newTown_backend.service.dashboard.StudentDashboardService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/student")
@RequiresRole("STUDENT")
public class StudentController {

    private final StudentDashboardService dashboardService;

    public StudentController(StudentDashboardService dashboardService) {
        this.dashboardService = dashboardService;
    }

    @GetMapping("/scores")
    public ResponseEntity<ApiResponse<Map<String, Object>>> getScores() {
        return ResponseEntity.ok(ApiResponse.success(dashboardService.getScores()));
    }

    @GetMapping("/attendance")
    public ResponseEntity<ApiResponse<Map<String, Object>>> getAttendance() {
        return ResponseEntity.ok(ApiResponse.success(dashboardService.getAttendance()));
    }

    @GetMapping("/homework")
    public ResponseEntity<ApiResponse<Map<String, Object>>> getHomework() {
        return ResponseEntity.ok(ApiResponse.success(dashboardService.getHomework()));
    }
}