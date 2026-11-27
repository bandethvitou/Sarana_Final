package com.sarana_NIS.newTown_backend.service.reception;

import com.sarana_NIS.newTown_backend.dto.request.reception.ReceptionEnrollmentRequest;
import com.sarana_NIS.newTown_backend.model.entity.academic.Class;
import com.sarana_NIS.newTown_backend.model.entity.finance.Fee;
import com.sarana_NIS.newTown_backend.model.entity.finance.Payment;
import com.sarana_NIS.newTown_backend.model.entity.user.Student;
import com.sarana_NIS.newTown_backend.model.enums.EnrollmentStatus;
import com.sarana_NIS.newTown_backend.model.enums.FeeCategory;
import com.sarana_NIS.newTown_backend.model.enums.FeeStatus;
import com.sarana_NIS.newTown_backend.model.enums.PaymentStatus;
import com.sarana_NIS.newTown_backend.repository.ClassRepository;
import com.sarana_NIS.newTown_backend.repository.FeeRepository;
import com.sarana_NIS.newTown_backend.repository.PaymentRepository;
import com.sarana_NIS.newTown_backend.repository.StudentRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Service
public class ReceptionService {

    private final StudentRepository studentRepository;
    private final ClassRepository classRepository;
    private final FeeRepository feeRepository;
    private final PaymentRepository paymentRepository;

    public ReceptionService(StudentRepository studentRepository, ClassRepository classRepository,
                            FeeRepository feeRepository, PaymentRepository paymentRepository) {
        this.studentRepository = studentRepository;
        this.classRepository = classRepository;
        this.feeRepository = feeRepository;
        this.paymentRepository = paymentRepository;
    }

    @Transactional
    public Map<String, Object> enrollAndPay(ReceptionEnrollmentRequest req) {
        // 1. Create Student
        Student student = new Student();
        student.setStudentId("STU-" + System.currentTimeMillis());
        student.setNameEnglish(req.getStudentName());
        student.setDateOfBirth(req.getDob());
        student.setGender(req.getGender());
        student.setLevel(req.getLevel());
        student.setPreviousSchool(req.getPreviousSchool());
        student.setMedicalNotes(req.getNotes());
        student.setEnrollmentDate(LocalDate.now());
        student.setStudentStatus(EnrollmentStatus.ACTIVE);

        if (req.getClassId() != null) {
            Class c = classRepository.findById(req.getClassId()).orElse(null);
            student.setCurrentClass(c);
        }
        student = studentRepository.save(student);

        // 2. Create Fee
        Fee fee = new Fee();
        fee.setStudent(student);
        fee.setCategory(FeeCategory.TUITION);
        fee.setAmount(req.getFeeAmount());
        fee.setDueDate(LocalDate.now());
        fee.setStatus(FeeStatus.PAID);
        fee.setReceiptNumber("RCPT-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase());
        fee = feeRepository.save(fee);

        // 3. Create Payment
        Payment payment = new Payment();
        payment.setStudent(student);
        payment.setAmount(req.getFeeAmount().doubleValue());
        payment.setPaymentDate(LocalDate.now());
        payment.setPaymentMethod(req.getPaymentMethod());
        payment.setDescription("Enrollment Payment: " + req.getFeeType());
        payment.setReferenceNumber(req.getTransactionId());
        payment.setStatus(PaymentStatus.PAID);
        payment = paymentRepository.save(payment);

        // 4. Return exact response
        Map<String, Object> response = new HashMap<>();
        response.put("studentId", student.getId());
        response.put("enrollmentId", student.getId());
        response.put("feeId", fee.getId());
        response.put("receiptNumber", fee.getReceiptNumber());

        return response;
    }
}