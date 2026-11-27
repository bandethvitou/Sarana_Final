package com.sarana_NIS.newTown_backend.model.entity.user;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.sarana_NIS.newTown_backend.model.entity.BaseEntity;
import com.sarana_NIS.newTown_backend.model.entity.core.User;
import com.sarana_NIS.newTown_backend.model.entity.management.Department;
import com.sarana_NIS.newTown_backend.model.entity.position.StaffPosition;
import com.sarana_NIS.newTown_backend.model.enums.EmployeeStatus;
import com.sarana_NIS.newTown_backend.model.enums.Shift;
import jakarta.persistence.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "staff")
public class Staff extends BaseEntity {

    @Column(name = "staff_id", nullable = false, unique = true, length = 50)
    private String staffId;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "department_id")
    private Department department;

    @Column(name = "base_salary", precision = 10, scale = 2)
    private BigDecimal baseSalary;

    @Column(precision = 10, scale = 2)
    private BigDecimal allowances = BigDecimal.ZERO;

    @Enumerated(EnumType.STRING)
    @Column(name = "shift")
    private Shift shift;

    @Column(name = "join_date")
    private LocalDate joinDate;

    @Column(name = "position")
    private String position;

    @Column(name = "qualification", length = 255)
    private String qualification;

    @Enumerated(EnumType.STRING)
    @Column(name = "staff_status")
    private EmployeeStatus staffStatus = EmployeeStatus.ACTIVE;

    @JsonIgnore // <--- PREVENT RECURSION
    @OneToMany(mappedBy = "staff", cascade = CascadeType.ALL, fetch = FetchType.LAZY) // <--- LAZY LOAD
    private List<StaffPosition> staffPositions = new ArrayList<>();

    @JsonIgnore // <--- PREVENT RECURSION
    @OneToMany(mappedBy = "staff", cascade = CascadeType.ALL, fetch = FetchType.LAZY) // <--- LAZY LOAD
    private List<LeaveRequest> leaveRequests = new ArrayList<>();

    public Staff() {
        this.allowances = BigDecimal.ZERO;
        this.staffStatus = EmployeeStatus.ACTIVE;
        this.staffPositions = new ArrayList<>();
        this.leaveRequests = new ArrayList<>();
    }

    // (Keep all your getters and setters exactly the same here)
    public String getStaffId() { return staffId; }
    public void setStaffId(String staffId) { this.staffId = staffId; }
    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
    public Department getDepartment() { return department; }
    public void setDepartment(Department department) { this.department = department; }
    public BigDecimal getBaseSalary() { return baseSalary; }
    public void setBaseSalary(BigDecimal baseSalary) { this.baseSalary = baseSalary; }
    public BigDecimal getAllowances() { return allowances; }
    public void setAllowances(BigDecimal allowances) { this.allowances = allowances; }
    public Shift getShift() { return shift; }
    public void setShift(Shift shift) { this.shift = shift; }
    public LocalDate getJoinDate() { return joinDate; }
    public void setJoinDate(LocalDate joinDate) { this.joinDate = joinDate; }
    public String getPosition() { return position; }
    public void setPosition(String position) { this.position = position; }
    public String getQualification() { return qualification; }
    public void setQualification(String qualification) { this.qualification = qualification; }
    public EmployeeStatus getStaffStatus() { return staffStatus; }
    public void setStaffStatus(EmployeeStatus staffStatus) { this.staffStatus = staffStatus; }
    public List<StaffPosition> getStaffPositions() { return staffPositions; }
    public void setStaffPositions(List<StaffPosition> staffPositions) { this.staffPositions = staffPositions; }
    public List<LeaveRequest> getLeaveRequests() { return leaveRequests; }
    public void setLeaveRequests(List<LeaveRequest> leaveRequests) { this.leaveRequests = leaveRequests; }
    public BigDecimal getTotalSalary() {
        if (baseSalary == null) return BigDecimal.ZERO;
        if (allowances == null) return baseSalary;
        return baseSalary.add(allowances);
    }
    public boolean isActive() { return this.staffStatus == EmployeeStatus.ACTIVE; }
    public boolean isOnLeave() { return this.staffStatus == EmployeeStatus.ON_LEAVE; }
    public boolean isTerminated() { return this.staffStatus == EmployeeStatus.TERMINATED; }
    public boolean isSuspended() { return this.staffStatus == EmployeeStatus.SUSPENDED; }
    public void addStaffPosition(StaffPosition staffPosition) {
        if (this.staffPositions == null) this.staffPositions = new ArrayList<>();
        this.staffPositions.add(staffPosition);
        staffPosition.setStaff(this);
    }
    public void removeStaffPosition(StaffPosition staffPosition) {
        if (this.staffPositions != null) {
            this.staffPositions.remove(staffPosition);
            staffPosition.setStaff(null);
        }
    }
    public void addLeaveRequest(LeaveRequest leaveRequest) {
        if (this.leaveRequests == null) this.leaveRequests = new ArrayList<>();
        this.leaveRequests.add(leaveRequest);
        leaveRequest.setStaff(this);
    }
    public void removeLeaveRequest(LeaveRequest leaveRequest) {
        if (this.leaveRequests != null) {
            this.leaveRequests.remove(leaveRequest);
            leaveRequest.setStaff(null);
        }
    }
}