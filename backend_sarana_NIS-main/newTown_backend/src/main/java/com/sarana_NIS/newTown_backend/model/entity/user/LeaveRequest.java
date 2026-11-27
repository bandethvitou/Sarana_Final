package com.sarana_NIS.newTown_backend.model.entity.user;

import com.sarana_NIS.newTown_backend.model.entity.BaseEntity;
import com.sarana_NIS.newTown_backend.model.entity.core.User;
import com.sarana_NIS.newTown_backend.model.enums.LeaveStatus;
import com.sarana_NIS.newTown_backend.model.enums.LeaveType;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;

@Entity
@Table(name = "leave_requests")
public class LeaveRequest extends BaseEntity {

    @ManyToOne
    @JoinColumn(name = "staff_id", nullable = false)
    private Staff staff;

    @Enumerated(EnumType.STRING)
    @Column(name = "leave_type", nullable = false)
    private LeaveType leaveType;

    @Column(name = "start_date", nullable = false)
    private LocalDate startDate;

    @Column(name = "end_date", nullable = false)
    private LocalDate endDate;

    @Column(name = "days")
    private Integer days;

    @Column(columnDefinition = "TEXT")
    private String reason;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private LeaveStatus status = LeaveStatus.PENDING;

    @ManyToOne
    @JoinColumn(name = "approved_by")
    private User approvedBy;

    @Column(name = "approved_date")
    private LocalDate approvedDate;

    @Column(name = "denial_reason", columnDefinition = "TEXT")
    private String denialReason;

    // Constructors
    public LeaveRequest() {
        this.status = LeaveStatus.PENDING;
    }

    public LeaveRequest(Staff staff, LeaveType leaveType, LocalDate startDate, LocalDate endDate) {
        this.staff = staff;
        this.leaveType = leaveType;
        this.startDate = startDate;
        this.endDate = endDate;
        this.status = LeaveStatus.PENDING;
        calculateDays();
    }

    // Getters and Setters
    

    

    public Staff getStaff() {
        return staff;
    }

    public void setStaff(Staff staff) {
        this.staff = staff;
    }

    public LeaveType getLeaveType() {
        return leaveType;
    }

    public void setLeaveType(LeaveType leaveType) {
        this.leaveType = leaveType;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }

    public Integer getDays() {
        return days;
    }

    public void setDays(Integer days) {
        this.days = days;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }

    public LeaveStatus getStatus() {
        return status;
    }

    public void setStatus(LeaveStatus status) {
        this.status = status;
    }

    public User getApprovedBy() {
        return approvedBy;
    }

    public void setApprovedBy(User approvedBy) {
        this.approvedBy = approvedBy;
    }

    public LocalDate getApprovedDate() {
        return approvedDate;
    }

    public void setApprovedDate(LocalDate approvedDate) {
        this.approvedDate = approvedDate;
    }

    public String getDenialReason() {
        return denialReason;
    }

    public void setDenialReason(String denialReason) {
        this.denialReason = denialReason;
    }

    // Helper methods
    public void calculateDays() {
        if (startDate != null && endDate != null) {
            this.days = (int) ChronoUnit.DAYS.between(startDate, endDate) + 1;
        }
    }

    public boolean isPending() {
        return this.status == LeaveStatus.PENDING;
    }

    public boolean isApproved() {
        return this.status == LeaveStatus.APPROVED;
    }

    public boolean isRejected() {
        return this.status == LeaveStatus.REJECTED;
    }

    public boolean isCancelled() {
        return this.status == LeaveStatus.CANCELLED;
    }

    public boolean isOverlapping(LocalDate startDate, LocalDate endDate) {
        return !(this.endDate.isBefore(startDate) || this.startDate.isAfter(endDate));
    }

    public boolean isActiveOnDate(LocalDate date) {
        return this.status == LeaveStatus.APPROVED &&
                !date.isBefore(startDate) &&
                !date.isAfter(endDate);
    }

    public void approve(User approver) {
        this.status = LeaveStatus.APPROVED;
        this.approvedBy = approver;
        this.approvedDate = LocalDate.now();
    }

    public void reject(User approver, String reason) {
        this.status = LeaveStatus.REJECTED;
        this.approvedBy = approver;
        this.approvedDate = LocalDate.now();
        this.denialReason = reason;
    }

    public void cancel() {
        this.status = LeaveStatus.CANCELLED;
    }
}