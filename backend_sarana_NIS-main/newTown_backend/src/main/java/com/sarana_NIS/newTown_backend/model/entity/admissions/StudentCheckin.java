package com.sarana_NIS.newTown_backend.model.entity.admissions;

import com.sarana_NIS.newTown_backend.model.entity.BaseEntity;
import com.sarana_NIS.newTown_backend.model.entity.academic.Class;
import com.sarana_NIS.newTown_backend.model.entity.core.User;
import com.sarana_NIS.newTown_backend.model.entity.user.Student;
import com.sarana_NIS.newTown_backend.model.enums.AttendanceStatus;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table(name = "student_checkin",
        uniqueConstraints = @UniqueConstraint(columnNames = {"student_id", "checkin_date"}))
public class StudentCheckin extends BaseEntity {

    @ManyToOne
    @JoinColumn(name = "student_id", nullable = false)
    private Student student;

    @ManyToOne
    @JoinColumn(name = "class_id", nullable = false)
    private Class classEntity;  // ✅ This is the field name

    @Column(name = "checkin_date", nullable = false)
    private LocalDate checkinDate;

    @Column(name = "checkin_time")
    private LocalTime checkinTime;

    @Column(name = "checkout_time")
    private LocalTime checkoutTime;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private AttendanceStatus status = AttendanceStatus.PRESENT;

    @Column(columnDefinition = "TEXT")
    private String comment;

    @ManyToOne
    @JoinColumn(name = "marked_by", nullable = false)
    private User markedBy;

    @Column(name = "is_bulk_action")
    private Boolean isBulkAction = false;

    @Column(name = "bulk_action_id")
    private String bulkActionId;

    @Column(name = "late_minutes")
    private Integer lateMinutes;

    @Column(name = "early_departure_minutes")
    private Integer earlyDepartureMinutes;

    // Constructors
    public StudentCheckin() {}

    public StudentCheckin(Student student, Class classEntity, LocalDate checkinDate) {
        this.student = student;
        this.classEntity = classEntity;
        this.checkinDate = checkinDate;
    }

    // Getters and Setters
    

    

    public Student getStudent() {
        return student;
    }

    public void setStudent(Student student) {
        this.student = student;
    }

    public Class getClassEntity() {
        return classEntity;
    }

    public void setClassEntity(Class classEntity) {
        this.classEntity = classEntity;
    }

    public LocalDate getCheckinDate() {
        return checkinDate;
    }

    public void setCheckinDate(LocalDate checkinDate) {
        this.checkinDate = checkinDate;
    }

    public LocalTime getCheckinTime() {
        return checkinTime;
    }

    public void setCheckinTime(LocalTime checkinTime) {
        this.checkinTime = checkinTime;
    }

    public LocalTime getCheckoutTime() {
        return checkoutTime;
    }

    public void setCheckoutTime(LocalTime checkoutTime) {
        this.checkoutTime = checkoutTime;
    }

    public AttendanceStatus getStatus() {
        return status;
    }

    public void setStatus(AttendanceStatus status) {
        this.status = status;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public User getMarkedBy() {
        return markedBy;
    }

    public void setMarkedBy(User markedBy) {
        this.markedBy = markedBy;
    }

    public Boolean getIsBulkAction() {
        return isBulkAction;
    }

    public void setIsBulkAction(Boolean isBulkAction) {
        this.isBulkAction = isBulkAction;
    }

    public String getBulkActionId() {
        return bulkActionId;
    }

    public void setBulkActionId(String bulkActionId) {
        this.bulkActionId = bulkActionId;
    }

    public Integer getLateMinutes() {
        return lateMinutes;
    }

    public void setLateMinutes(Integer lateMinutes) {
        this.lateMinutes = lateMinutes;
    }

    public Integer getEarlyDepartureMinutes() {
        return earlyDepartureMinutes;
    }

    public void setEarlyDepartureMinutes(Integer earlyDepartureMinutes) {
        this.earlyDepartureMinutes = earlyDepartureMinutes;
    }

    // Helper method
    @PrePersist
    @PreUpdate
    public void calculateLateMinutes() {
        if (checkinTime != null && checkinTime.isAfter(LocalTime.of(8, 0))) {
            this.lateMinutes = (int) java.time.Duration.between(LocalTime.of(8, 0), checkinTime).toMinutes();
        } else {
            this.lateMinutes = 0;
        }
    }
}