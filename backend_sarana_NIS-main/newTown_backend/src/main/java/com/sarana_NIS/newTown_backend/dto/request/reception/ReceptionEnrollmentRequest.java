package com.sarana_NIS.newTown_backend.dto.request.reception;

import com.sarana_NIS.newTown_backend.model.enums.Gender;
import com.sarana_NIS.newTown_backend.model.enums.Level;
import com.sarana_NIS.newTown_backend.model.enums.PaymentMethod;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;
import java.time.LocalDate;

public class ReceptionEnrollmentRequest {

    @NotBlank(message = "Student name is required")
    private String studentName;

    private LocalDate dob;
    private Gender gender;

    @NotNull(message = "Level is required")
    private Level level;

    private Long classId;

    @NotBlank(message = "Parent name is required")
    private String parentName;

    @NotBlank(message = "Phone is required")
    private String phone;

    private String email;
    private String previousSchool;
    private String notes;

    @NotNull(message = "Fee amount is required")
    private BigDecimal feeAmount;

    @NotBlank(message = "Fee type is required")
    private String feeType;

    @NotNull(message = "Payment method is required")
    private PaymentMethod paymentMethod;

    private String transactionId;

    // Getters and Setters
    public String getStudentName() { return studentName; }
    public void setStudentName(String studentName) { this.studentName = studentName; }

    public LocalDate getDob() { return dob; }
    public void setDob(LocalDate dob) { this.dob = dob; }

    public Gender getGender() { return gender; }
    public void setGender(Gender gender) { this.gender = gender; }

    public Level getLevel() { return level; }
    public void setLevel(Level level) { this.level = level; }

    public Long getClassId() { return classId; }
    public void setClassId(Long classId) { this.classId = classId; }

    public String getParentName() { return parentName; }
    public void setParentName(String parentName) { this.parentName = parentName; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPreviousSchool() { return previousSchool; }
    public void setPreviousSchool(String previousSchool) { this.previousSchool = previousSchool; }

    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }

    public BigDecimal getFeeAmount() { return feeAmount; }
    public void setFeeAmount(BigDecimal feeAmount) { this.feeAmount = feeAmount; }

    public String getFeeType() { return feeType; }
    public void setFeeType(String feeType) { this.feeType = feeType; }

    public PaymentMethod getPaymentMethod() { return paymentMethod; }
    public void setPaymentMethod(PaymentMethod paymentMethod) { this.paymentMethod = paymentMethod; }

    public String getTransactionId() { return transactionId; }
    public void setTransactionId(String transactionId) { this.transactionId = transactionId; }
}