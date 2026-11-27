package com.sarana_NIS.newTown_backend.model.entity.management;

import com.sarana_NIS.newTown_backend.model.entity.BaseEntity;
import com.sarana_NIS.newTown_backend.model.entity.core.User;
import com.sarana_NIS.newTown_backend.model.enums.ProposalStatus;
import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "proposals")
public class Proposal extends BaseEntity {

    @Column(nullable = false, length = 255)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(columnDefinition = "TEXT")
    private String content;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ProposalStatus status = ProposalStatus.PENDING;

    @ManyToOne
    @JoinColumn(name = "submitted_by")
    private User submittedBy;

    @Column(name = "submitted_date")
    private LocalDateTime submittedDate;

    @ManyToOne
    @JoinColumn(name = "reviewed_by")
    private User reviewedBy;

    @Column(name = "reviewed_date")
    private LocalDateTime reviewedDate;

    @Column(name = "reviewer_comments", columnDefinition = "TEXT")
    private String reviewerComments;

    @ManyToOne
    @JoinColumn(name = "escalated_by")
    private User escalatedBy;

    @Column(name = "escalated_date")
    private LocalDateTime escalatedDate;

    @ManyToOne
    @JoinColumn(name = "department_id")
    private Department department;

    @Column(name = "priority")
    private String priority = "MEDIUM";

    @Column(name = "due_date")
    private LocalDateTime dueDate;

    @Column(name = "is_escalated")
    private Boolean isEscalated = false;

    @Column(name = "type")
    private String type;

    @Column(name = "budget_amount")
    private Double budgetAmount;

    @ManyToOne
    @JoinColumn(name = "approved_by")
    private User approvedBy;

    @Column(name = "approved_date")
    private LocalDateTime approvedDate;

    @Column(name = "rejection_reason", columnDefinition = "TEXT")
    private String rejectionReason;

    @Column(name = "escalated_to")
    private String escalatedTo;

    @Column(name = "escalated_at")
    private LocalDateTime escalatedAt;

    @Column(columnDefinition = "TEXT")
    private String attachments;

    // Constructors
    public Proposal() {
    }

    public Proposal(String title, String description, String content) {
        this.title = title;
        this.description = description;
        this.content = content;
        this.status = ProposalStatus.PENDING;
        this.isEscalated = false;
    }

    // Getters and Setters
    

    

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public ProposalStatus getStatus() {
        return status;
    }

    public void setStatus(ProposalStatus status) {
        this.status = status;
    }

    public User getSubmittedBy() {
        return submittedBy;
    }

    public void setSubmittedBy(User submittedBy) {
        this.submittedBy = submittedBy;
    }

    public LocalDateTime getSubmittedDate() {
        return submittedDate;
    }

    public void setSubmittedDate(LocalDateTime submittedDate) {
        this.submittedDate = submittedDate;
    }

    public User getReviewedBy() {
        return reviewedBy;
    }

    public void setReviewedBy(User reviewedBy) {
        this.reviewedBy = reviewedBy;
    }

    public LocalDateTime getReviewedDate() {
        return reviewedDate;
    }

    public void setReviewedDate(LocalDateTime reviewedDate) {
        this.reviewedDate = reviewedDate;
    }

    public String getReviewerComments() {
        return reviewerComments;
    }

    public void setReviewerComments(String reviewerComments) {
        this.reviewerComments = reviewerComments;
    }

    public User getEscalatedBy() {
        return escalatedBy;
    }

    public void setEscalatedBy(User escalatedBy) {
        this.escalatedBy = escalatedBy;
    }

    public LocalDateTime getEscalatedDate() {
        return escalatedDate;
    }

    public void setEscalatedDate(LocalDateTime escalatedDate) {
        this.escalatedDate = escalatedDate;
    }

    public Department getDepartment() {
        return department;
    }

    public void setDepartment(Department department) {
        this.department = department;
    }

    public String getPriority() {
        return priority;
    }

    public void setPriority(String priority) {
        this.priority = priority;
    }

    public LocalDateTime getDueDate() {
        return dueDate;
    }

    public void setDueDate(LocalDateTime dueDate) {
        this.dueDate = dueDate;
    }

    public Boolean getIsEscalated() {
        return isEscalated;
    }

    public void setIsEscalated(Boolean isEscalated) {
        this.isEscalated = isEscalated;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Double getBudgetAmount() {
        return budgetAmount;
    }

    public void setBudgetAmount(Double budgetAmount) {
        this.budgetAmount = budgetAmount;
    }

    public User getApprovedBy() {
        return approvedBy;
    }

    public void setApprovedBy(User approvedBy) {
        this.approvedBy = approvedBy;
    }

    public LocalDateTime getApprovedDate() {
        return approvedDate;
    }

    public void setApprovedDate(LocalDateTime approvedDate) {
        this.approvedDate = approvedDate;
    }

    public String getRejectionReason() {
        return rejectionReason;
    }

    public void setRejectionReason(String rejectionReason) {
        this.rejectionReason = rejectionReason;
    }

    public String getEscalatedTo() {
        return escalatedTo;
    }

    public void setEscalatedTo(String escalatedTo) {
        this.escalatedTo = escalatedTo;
    }

    public LocalDateTime getEscalatedAt() {
        return escalatedAt;
    }

    public void setEscalatedAt(LocalDateTime escalatedAt) {
        this.escalatedAt = escalatedAt;
    }

    public String getAttachments() {
        return attachments;
    }

    public void setAttachments(String attachments) {
        this.attachments = attachments;
    }

    // Helper methods
    public boolean isPending() {
        return this.status == ProposalStatus.PENDING;
    }

    public boolean isApproved() {
        return this.status == ProposalStatus.APPROVED;
    }

    public boolean isRejected() {
        return this.status == ProposalStatus.REJECTED;
    }

    public boolean isEscalated() {
        return this.status == ProposalStatus.ESCALATED ||
                (this.isEscalated != null && this.isEscalated);
    }
}