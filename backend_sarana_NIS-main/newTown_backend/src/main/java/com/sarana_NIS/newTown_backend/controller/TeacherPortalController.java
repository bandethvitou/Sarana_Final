package com.sarana_NIS.newTown_backend.controller;

import com.sarana_NIS.newTown_backend.dto.request.academic.*;
import com.sarana_NIS.newTown_backend.dto.response.common.ApiResponse;
import com.sarana_NIS.newTown_backend.model.entity.user.Student;
import com.sarana_NIS.newTown_backend.repository.StudentRepository;
import com.sarana_NIS.newTown_backend.security.annotation.RequiresRole;
import com.sarana_NIS.newTown_backend.service.academic.*;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/teacher")
@RequiresRole("TEACHER")
public class TeacherPortalController {

    private final StudentRepository studentRepository;
    private final AttendanceService attendanceService;
    private final ScoreService scoreService;
    private final HomeworkService homeworkService;
    private final LessonPlanService lessonPlanService;

    public TeacherPortalController(StudentRepository studentRepository,
                                   AttendanceService attendanceService,
                                   ScoreService scoreService,
                                   HomeworkService homeworkService,
                                   LessonPlanService lessonPlanService) {
        this.studentRepository = studentRepository;
        this.attendanceService = attendanceService;
        this.scoreService = scoreService;
        this.homeworkService = homeworkService;
        this.lessonPlanService = lessonPlanService;
    }

    // ============================================================
    // 1. DASHBOARD & STUDENTS
    // ============================================================
    @GetMapping("/dashboard")
    public ResponseEntity<ApiResponse<Map<String, Object>>> getDashboard(@RequestParam Long classId, @RequestParam Long subjectId) {
        Map<String, Object> stats = new HashMap<>();
        stats.put("classAverage", 78.5); // Mocked for Phase 1
        stats.put("highestScore", 95.0);
        stats.put("lowestScore", 45.0);
        stats.put("attendanceRate", 92.5);
        return ResponseEntity.ok(ApiResponse.success(stats));
    }

    @GetMapping("/students")
    public ResponseEntity<ApiResponse<List<Student>>> getStudentsForClass(@RequestParam Long classId) {
        // Returns all students so the UI table populates
        return ResponseEntity.ok(ApiResponse.success(studentRepository.findAll()));
    }

    // ============================================================
    // 2. ATTENDANCE
    // ============================================================
    @PostMapping("/attendance")
    public ResponseEntity<ApiResponse<Object>> saveAttendance(@Valid @RequestBody AttendanceRequest request) {
        var result = attendanceService.markBulkAttendance(request, 1L);
        return ResponseEntity.ok(ApiResponse.success("Attendance saved successfully", result));
    }

    // ============================================================
    // 3. SCORES
    // ============================================================
    @PostMapping("/scores")
    public ResponseEntity<ApiResponse<Object>> saveScores(@Valid @RequestBody ScoreSubmitRequest request) {
        var result = scoreService.submitBulkScores(request, 1L);
        return ResponseEntity.ok(ApiResponse.success("Scores saved successfully", result));
    }

    // ============================================================
    // 4. HOMEWORK
    // ============================================================
    @PostMapping("/homework")
    public ResponseEntity<ApiResponse<Object>> createHomework(@Valid @RequestBody HomeworkRequest request) {
        var result = homeworkService.createHomework(request, 1L);
        return ResponseEntity.ok(ApiResponse.success("Homework created successfully", result));
    }

    // ============================================================
    // 5. LESSON PLANS
    // ============================================================
    @PostMapping("/plans")
    public ResponseEntity<ApiResponse<Object>> createLessonPlan(@Valid @RequestBody LessonPlanRequest request) {
        var result = lessonPlanService.createLessonPlan(request, 1L);
        return ResponseEntity.ok(ApiResponse.success("Lesson plan draft created", result));
    }

    @PutMapping("/plans/{id}/submit")
    public ResponseEntity<ApiResponse<Object>> submitLessonPlan(@PathVariable Long id, @Valid @RequestBody LessonPlanSubmitRequest request) {
        request.setLessonPlanId(id); // Ensure ID matches path
        var result = lessonPlanService.submitLessonPlan(request);
        return ResponseEntity.ok(ApiResponse.success("Lesson plan submitted to Manager", result));
    }

    // ============================================================
    // 6. AT-RISK STUDENTS & REPORTS (Mocked)
    // ============================================================
    @GetMapping("/at-risk")
    public ResponseEntity<ApiResponse<List<Student>>> getAtRiskStudents() {
        // Returning a sublist of students to simulate at-risk UI
        List<Student> all = studentRepository.findAll();
        List<Student> atRisk = all.isEmpty() ? new ArrayList<>() : all.subList(0, Math.min(2, all.size()));
        return ResponseEntity.ok(ApiResponse.success(atRisk));
    }

    @PostMapping("/at-risk/report")
    public ResponseEntity<ApiResponse<String>> reportAtRiskStudent(@RequestBody Map<String, Object> payload) {
        return ResponseEntity.ok(ApiResponse.success("Report emailed to Manager successfully", null));
    }

    @PostMapping("/reports")
    public ResponseEntity<ApiResponse<String>> submitIssueReport(@RequestBody Map<String, Object> payload) {
        return ResponseEntity.ok(ApiResponse.success("Issue report submitted to Manager", null));
    }

    // ============================================================
    // 7. SCHEDULE (Mocked)
    // ============================================================
    @GetMapping("/schedule")
    public ResponseEntity<ApiResponse<List<Map<String, Object>>>> getSchedule() {
        List<Map<String, Object>> schedule = List.of(
                Map.of("day", "Monday", "time", "08:00 - 10:00", "subject", "Math", "class", "Grade 5A"),
                Map.of("day", "Wednesday", "time", "10:30 - 12:00", "subject", "Science", "class", "Grade 6B")
        );
        return ResponseEntity.ok(ApiResponse.success(schedule));
    }
}