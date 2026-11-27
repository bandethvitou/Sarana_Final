package com.sarana_NIS.newTown_backend.controller.reception;

import com.sarana_NIS.newTown_backend.dto.request.reception.ReceptionEnrollmentRequest;
import com.sarana_NIS.newTown_backend.dto.response.common.ApiResponse;
import com.sarana_NIS.newTown_backend.model.entity.finance.Payment;
import com.sarana_NIS.newTown_backend.model.enums.PaymentMethod;
import com.sarana_NIS.newTown_backend.model.enums.PaymentStatus;
import com.sarana_NIS.newTown_backend.repository.PaymentRepository;
import com.sarana_NIS.newTown_backend.security.annotation.RequiresRole;
import com.sarana_NIS.newTown_backend.service.reception.ReceptionService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/reception")
@RequiresRole("RECEPTIONIST")
public class ReceptionController {

    private final ReceptionService receptionService;
    private final PaymentRepository paymentRepository;

    public ReceptionController(ReceptionService receptionService, PaymentRepository paymentRepository) {
        this.receptionService = receptionService;
        this.paymentRepository = paymentRepository;
    }

    @PostMapping("/enrollments")
    public ResponseEntity<ApiResponse<Map<String, Object>>> enrollStudent(
            @Valid @RequestBody ReceptionEnrollmentRequest request) {

        Map<String, Object> result = receptionService.enrollAndPay(request);
        return ResponseEntity.ok(ApiResponse.success("Enrollment successful", result));
    }

    @PostMapping("/payments")
    public ResponseEntity<ApiResponse<Map<String, Object>>> recordPayment(@RequestBody Map<String, Object> request) {
        Double amount = Double.valueOf(request.get("amount").toString());
        String method = request.get("method").toString();

        Payment payment = new Payment();
        payment.setAmount(amount);
        payment.setPaymentMethod(PaymentMethod.valueOf(method.toUpperCase()));
        payment.setPaymentDate(LocalDate.now());
        payment.setStatus(PaymentStatus.PAID);
        payment.setDescription("Direct payment at reception");

        Payment saved = paymentRepository.save(payment);

        Map<String, Object> response = new HashMap<>();
        response.put("paymentId", saved.getId());
        response.put("receiptNumber", "RCPT-" + saved.getId());
        response.put("status", "paid");

        return ResponseEntity.ok(ApiResponse.success("Payment recorded", response));
    }

    @GetMapping("/visitors")
    public ResponseEntity<ApiResponse<Object>> getVisitors() {
        // Mock for Phase 1
        return ResponseEntity.ok(ApiResponse.success(java.util.List.of()));
    }

    @PostMapping("/check-in")
    public ResponseEntity<ApiResponse<Map<String, Object>>> checkInStudent(@RequestBody Map<String, Object> request) {
        Map<String, Object> response = new HashMap<>();
        response.put("status", "checked_in");
        response.put("time", LocalDateTime.now().toString());
        return ResponseEntity.ok(ApiResponse.success("Student checked in", response));
    }
}