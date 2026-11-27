package com.sarana_NIS.newTown_backend.controller.manager;

import com.sarana_NIS.newTown_backend.dto.response.common.ApiResponse;
import com.sarana_NIS.newTown_backend.model.entity.user.Student;
import com.sarana_NIS.newTown_backend.repository.StudentRepository;
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
@RequestMapping("/api/manager")
@RequiresRole("MANAGER")
public class ManagerReceptionController {

    private final StudentRepository studentRepository;

    public ManagerReceptionController(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    @GetMapping("/dashboard/stats")
    public ResponseEntity<ApiResponse<Map<String, Object>>> getDashboardStats() {
        Map<String, Object> stats = new HashMap<>();
        stats.put("studentsInDept", studentRepository.count());
        stats.put("atRiskCount", 1);
        stats.put("pendingFees", 0);
        stats.put("teamMembers", 8);
        stats.put("pendingReports", 0);
        return ResponseEntity.ok(ApiResponse.success(stats));
    }

    @GetMapping("/enrollments")
    public ResponseEntity<ApiResponse<List<Student>>> getRecentEnrollments() {
        return ResponseEntity.ok(ApiResponse.success(studentRepository.findAll()));
    }

    @GetMapping("/at-risk")
    public ResponseEntity<ApiResponse<List<Map<String, Object>>>> getAtRiskStudents() {
        List<Map<String, Object>> atRisk = new ArrayList<>();
        Map<String, Object> student = new HashMap<>();
        student.put("studentId", 1);
        student.put("studentName", "Sok Heng");
        student.put("class", "Grade 5A");
        student.put("avgScore", 45.5);
        student.put("attendance", 68);
        student.put("risk", "HIGH");
        student.put("flags", List.of("Low Attendance", "Failing Math"));
        atRisk.add(student);
        return ResponseEntity.ok(ApiResponse.success(atRisk));
    }
}