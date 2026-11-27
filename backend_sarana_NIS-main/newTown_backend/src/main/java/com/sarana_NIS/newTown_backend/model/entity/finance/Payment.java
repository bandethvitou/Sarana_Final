package com.sarana_NIS.newTown_backend.model.entity.finance;

import com.sarana_NIS.newTown_backend.model.entity.BaseEntity;
import com.sarana_NIS.newTown_backend.model.entity.user.Student;
import com.sarana_NIS.newTown_backend.model.enums.PaymentMethod;
import com.sarana_NIS.newTown_backend.model.enums.PaymentStatus;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "payments")
public class Payment extends BaseEntity {

    @ManyToOne
    @JoinColumn(name = "student_id", nullable = false)
    private Student student;

    // ✅ FIXED: Removed precision and scale from Double
    @Column(nullable = false)
    private Double amount;

    @Column(name = "payment_date", nullable = false)
    private LocalDate paymentDate;

    @Enumerated(EnumType.STRING)
    @Column(name = "payment_method", nullable = false)
    private PaymentMethod paymentMethod;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "reference_number")
    private String referenceNumber;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private PaymentStatus status = PaymentStatus.PENDING;

    @Column(name = "verified_by")
    private String verifiedBy;

    @Column(name = "verified_date")
    private LocalDateTime verifiedDate;

    @Column(columnDefinition = "TEXT")
    private String notes;

    @Column(name = "rejection_reason", columnDefinition = "TEXT")
    private String rejectionReason;
// Constructors
    public Payment() {
    }

    // Getters and Setters
    
    

    public Student getStudent() { return student; }
    public void setStudent(Student student) { this.student = student; }

    public Double getAmount() { return amount; }
    public void setAmount(Double amount) { this.amount = amount; }

    public LocalDate getPaymentDate() { return paymentDate; }
    public void setPaymentDate(LocalDate paymentDate) { this.paymentDate = paymentDate; }

    public PaymentMethod getPaymentMethod() { return paymentMethod; }
    public void setPaymentMethod(PaymentMethod paymentMethod) { this.paymentMethod = paymentMethod; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getReferenceNumber() { return referenceNumber; }
    public void setReferenceNumber(String referenceNumber) { this.referenceNumber = referenceNumber; }

    public PaymentStatus getStatus() { return status; }
    public void setStatus(PaymentStatus status) { this.status = status; }

    public String getVerifiedBy() { return verifiedBy; }
    public void setVerifiedBy(String verifiedBy) { this.verifiedBy = verifiedBy; }

    public LocalDateTime getVerifiedDate() { return verifiedDate; }
    public void setVerifiedDate(LocalDateTime verifiedDate) { this.verifiedDate = verifiedDate; }

    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }

    public String getRejectionReason() { return rejectionReason; }
    public void setRejectionReason(String rejectionReason) { this.rejectionReason = rejectionReason; }

    
    

    
    
}