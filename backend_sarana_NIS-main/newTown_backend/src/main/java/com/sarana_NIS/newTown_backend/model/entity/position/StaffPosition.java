package com.sarana_NIS.newTown_backend.model.entity.position;

import com.sarana_NIS.newTown_backend.model.entity.BaseEntity;
import com.sarana_NIS.newTown_backend.model.entity.core.User;
import com.sarana_NIS.newTown_backend.model.entity.user.Staff;
import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "staff_positions")
public class StaffPosition extends BaseEntity {

    @ManyToOne
    @JoinColumn(name = "staff_id", nullable = false)
    private Staff staff;

    @ManyToOne
    @JoinColumn(name = "position_id", nullable = false)
    private Position position;

    @ManyToOne
    @JoinColumn(name = "assigned_by")
    private User assignedBy;

    @Column(name = "is_temporary")
    private Boolean isTemporary = false;

    @Column(name = "start_date")
    private LocalDate startDate;

    @Column(name = "end_date")
    private LocalDate endDate;
@Column(columnDefinition = "TEXT")
    private String notes;

    // Constructors
    public StaffPosition() {}

    public StaffPosition(Staff staff, Position position) {
        this.staff = staff;
        this.position = position;
    }

    // Getters and Setters
    

    

    public Staff getStaff() {
        return staff;
    }

    public void setStaff(Staff staff) {
        this.staff = staff;
    }

    public Position getPosition() {
        return position;
    }

    public void setPosition(Position position) {
        this.position = position;
    }

    public User getAssignedBy() {
        return assignedBy;
    }

    public void setAssignedBy(User assignedBy) {
        this.assignedBy = assignedBy;
    }

    public Boolean getIsTemporary() {
        return isTemporary;
    }

    public void setIsTemporary(Boolean isTemporary) {
        this.isTemporary = isTemporary;
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

    

    

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }
}