package com.sarana_NIS.newTown_backend.controller;

import com.sarana_NIS.newTown_backend.dto.response.common.ApiResponse;
import com.sarana_NIS.newTown_backend.model.entity.finance.Payment;
import com.sarana_NIS.newTown_backend.model.entity.user.Student;
import com.sarana_NIS.newTown_backend.model.enums.PaymentMethod;
import com.sarana_NIS.newTown_backend.model.enums.PaymentStatus;
import com.sarana_NIS.newTown_backend.repository.PaymentRepository;
import com.sarana_NIS.newTown_backend.repository.StudentRepository;
import com.sarana_NIS.newTown_backend.security.annotation.RequiresRole;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/parent")
@RequiresRole("PARENT")
public class ParentPortalController {

    private final StudentRepository studentRepository;
    private final PaymentRepository paymentRepository;

    public ParentPortalController(StudentRepository studentRepository, PaymentRepository paymentRepository) {
        this.studentRepository = studentRepository;
        this.paymentRepository = paymentRepository;
    }

    // 1. My Children
    @GetMapping("/children")
    public ResponseEntity<ApiResponse<List<Student>>> getChildren() {
        // In Phase 2, this filters by the logged-in Parent's ID.
        // For now, returning all students so the UI works.
        List<Student> children = studentRepository.findAll();
        return ResponseEntity.ok(ApiResponse.success(children));
    }

    // 2. Child-Specific Data
    @GetMapping("/scores/{childId}")
    public ResponseEntity<ApiResponse<List<Map<String, Object>>>> getChildScores(@PathVariable Long childId) {
        List<Map<String, Object>> scores = List.of(
                Map.of("subject", "Mathematics", "score", 92, "grade", "A"),
                Map.of("subject", "Science", "score", 85, "grade", "B")
        );
        return ResponseEntity.ok(ApiResponse.success(scores));
    }

    @GetMapping("/attendance/{childId}")
    public ResponseEntity<ApiResponse<List<Map<String, Object>>>> getChildAttendance(@PathVariable Long childId) {
        List<Map<String, Object>> attendance = List.of(
                Map.of("date", "2025-06-01", "status", "PRESENT"),
                Map.of("date", "2025-06-02", "status", "ABSENT")
        );
        return ResponseEntity.ok(ApiResponse.success(attendance));
    }

    @GetMapping("/fees/{childId}")
    public ResponseEntity<ApiResponse<List<Map<String, Object>>>> getChildFees(@PathVariable Long childId) {
        List<Map<String, Object>> fees = List.of(
                Map.of("id", 1, "type", "Tuition", "amount", 500, "status", "PAID"),
                Map.of("id", 2, "type", "Transport", "amount", 100, "status", "PENDING")
        );
        return ResponseEntity.ok(ApiResponse.success(fees));
    }

    // 3. Fee Payment
    @PostMapping("/fees/pay")
    public ResponseEntity<ApiResponse<Map<String, Object>>> payFee(@RequestBody Map<String, Object> payload) {
        Long childId = Long.valueOf(payload.get("childId").toString());
        Double amount = Double.valueOf(payload.get("amount").toString());

        var student = studentRepository.findById(childId)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        Payment payment = new Payment();
        payment.setStudent(student);
        payment.setAmount(amount);
        payment.setPaymentDate(LocalDate.now());
        payment.setPaymentMethod(PaymentMethod.ONLINE_PAYMENT);
        payment.setDescription("Parent Fee Payment");
        payment.setStatus(PaymentStatus.PAID);

        Payment saved = paymentRepository.save(payment);

        return ResponseEntity.ok(ApiResponse.success("Payment successful", Map.of(
                "paymentId", saved.getId(),
                "receiptNumber", "RCPT-" + saved.getId()
        )));
    }

    // 4. Communication
    @PostMapping("/reports")
    public ResponseEntity<ApiResponse<String>> submitReport(@RequestBody Map<String, Object> payload) {
        return ResponseEntity.ok(ApiResponse.success("Report submitted to school", null));
    }

    @GetMapping("/events")
    public ResponseEntity<ApiResponse<List<Object>>> getEvents() {
        return ResponseEntity.ok(ApiResponse.success(new ArrayList<>()));
    }
}