package com.sarana_NIS.newTown_backend.model.entity.finance;

import com.sarana_NIS.newTown_backend.model.entity.BaseEntity;
import com.sarana_NIS.newTown_backend.model.entity.core.User;
import com.sarana_NIS.newTown_backend.model.enums.ExpenseCategory;
import com.sarana_NIS.newTown_backend.model.enums.ExpenseStatus;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "expenses")
public class Expense extends BaseEntity {

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ExpenseCategory category;

    // ✅ FIXED: Removed precision and scale from Double
    @Column(nullable = false)
    private Double amount;

    @Column(name = "expense_date", nullable = false)
    private LocalDate expenseDate;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ExpenseStatus status = ExpenseStatus.PENDING;

    @Column(name = "receipt_url")
    private String receiptUrl;

    @ManyToOne
    @JoinColumn(name = "requested_by")
    private User requestedBy;

    @ManyToOne
    @JoinColumn(name = "approved_by")
    private User approvedBy;

    @Column(name = "approved_date")
    private LocalDateTime approvedDate;

    @Column(name = "rejection_reason", columnDefinition = "TEXT")
    private String rejectionReason;

    // Constructors
    public Expense() {
    }

    // Getters and Setters
    
    

    public ExpenseCategory getCategory() { return category; }
    public void setCategory(ExpenseCategory category) { this.category = category; }

    public Double getAmount() { return amount; }
    public void setAmount(Double amount) { this.amount = amount; }

    public LocalDate getExpenseDate() { return expenseDate; }
    public void setExpenseDate(LocalDate expenseDate) { this.expenseDate = expenseDate; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public ExpenseStatus getStatus() { return status; }
    public void setStatus(ExpenseStatus status) { this.status = status; }

    public String getReceiptUrl() { return receiptUrl; }
    public void setReceiptUrl(String receiptUrl) { this.receiptUrl = receiptUrl; }

    public User getRequestedBy() { return requestedBy; }
    public void setRequestedBy(User requestedBy) { this.requestedBy = requestedBy; }

    public User getApprovedBy() { return approvedBy; }
    public void setApprovedBy(User approvedBy) { this.approvedBy = approvedBy; }

    public LocalDateTime getApprovedDate() { return approvedDate; }
    public void setApprovedDate(LocalDateTime approvedDate) { this.approvedDate = approvedDate; }

    public String getRejectionReason() { return rejectionReason; }
    public void setRejectionReason(String rejectionReason) { this.rejectionReason = rejectionReason; }
}