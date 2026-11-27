package com.sarana_NIS.newTown_backend.model.entity.finance;

import com.sarana_NIS.newTown_backend.model.entity.BaseEntity;
import com.sarana_NIS.newTown_backend.model.entity.user.Student;
import com.sarana_NIS.newTown_backend.model.enums.FeeCategory;
import com.sarana_NIS.newTown_backend.model.enums.FeeStatus;
import jakarta.persistence.*;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "fees")
public class Fee extends BaseEntity {

    @ManyToOne
    @JoinColumn(name = "student_id", nullable = false)
    private Student student;

    @Enumerated(EnumType.STRING)
    @Column(name = "category", nullable = false)  // ✅ This is the field name
    private FeeCategory category;  // ✅ Use category, not feeType

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal amount;

    @Column(name = "due_date", nullable = false)
    private LocalDate dueDate;

    @Column(name = "payment_date")
    private LocalDate paymentDate;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private FeeStatus status = FeeStatus.DUE;

    @Column(name = "receipt_number", length = 50)
    private String receiptNumber;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "academic_year", length = 20)
    private String academicYear;

    @Column(name = "term", length = 20)
    private String term;

    // Constructors
    public Fee() {
        this.status = FeeStatus.DUE;
    }

    public Fee(Student student, FeeCategory category, BigDecimal amount, LocalDate dueDate) {
        this.student = student;
        this.category = category;
        this.amount = amount;
        this.dueDate = dueDate;
        this.status = FeeStatus.DUE;
    }

    // Getters and Setters
    

    

    public Student getStudent() {
        return student;
    }

    public void setStudent(Student student) {
        this.student = student;
    }

    public FeeCategory getCategory() {  // ✅ Use category
        return category;
    }

    public void setCategory(FeeCategory category) {  // ✅ Use category
        this.category = category;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public LocalDate getDueDate() {
        return dueDate;
    }

    public void setDueDate(LocalDate dueDate) {
        this.dueDate = dueDate;
    }

    public LocalDate getPaymentDate() {
        return paymentDate;
    }

    public void setPaymentDate(LocalDate paymentDate) {
        this.paymentDate = paymentDate;
    }

    public FeeStatus getStatus() {
        return status;
    }

    public void setStatus(FeeStatus status) {
        this.status = status;
    }

    public String getReceiptNumber() {
        return receiptNumber;
    }

    public void setReceiptNumber(String receiptNumber) {
        this.receiptNumber = receiptNumber;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getAcademicYear() {
        return academicYear;
    }

    public void setAcademicYear(String academicYear) {
        this.academicYear = academicYear;
    }

    public String getTerm() {
        return term;
    }

    public void setTerm(String term) {
        this.term = term;
    }

    // Helper methods
    public boolean isOverdue() {
        if (status == FeeStatus.PAID) return false;
        if (dueDate == null) return false;
        return dueDate.isBefore(LocalDate.now());
    }

    public boolean isPaid() {
        return status == FeeStatus.PAID;
    }

    public boolean isDue() {
        return status == FeeStatus.DUE;
    }

    public void markAsPaid(String receiptNumber) {
        this.status = FeeStatus.PAID;
        this.paymentDate = LocalDate.now();
        this.receiptNumber = receiptNumber;
    }

    public void markAsOverdue() {
        if (isOverdue() && status != FeeStatus.PAID) {
            this.status = FeeStatus.OVERDUE;
        }
    }

    public long calculateDaysOverdue() {
        if (!isOverdue()) return 0;
        return java.time.temporal.ChronoUnit.DAYS.between(dueDate, LocalDate.now());
    }

    public void applyLateFee(BigDecimal lateFeeAmount) {
        if (isOverdue() && status != FeeStatus.PAID) {
            this.amount = this.amount.add(lateFeeAmount);
        }
    }
}