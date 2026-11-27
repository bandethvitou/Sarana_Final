package com.sarana_NIS.newTown_backend.model.entity.management;

import com.sarana_NIS.newTown_backend.model.entity.BaseEntity;
import com.sarana_NIS.newTown_backend.model.entity.academic.Subject;
import com.sarana_NIS.newTown_backend.model.entity.core.User;
import com.sarana_NIS.newTown_backend.model.entity.user.Staff;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "departments")
public class Department extends BaseEntity {

    @Column(nullable = false, unique = true, length = 100)
    private String name;

    @Column(length = 500)
    private String description;

    @Column(name = "department_code", length = 20)
    private String departmentCode;

    @ManyToOne
    @JoinColumn(name = "head_of_department")
    private User headOfDepartment;

    @Column(name = "head_user_id")
    private Long headUserId;

    @OneToMany(mappedBy = "department")
    private List<Subject> subjects = new ArrayList<>();

    @OneToMany(mappedBy = "department")
    private List<Staff> staff = new ArrayList<>();

    // Constructors
    public Department() {
    }

    public Department(String name, String description) {
        this.name = name;
        this.description = description;
    }

    // Getters and Setters
    

    

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getDepartmentCode() {
        return departmentCode;
    }

    public void setDepartmentCode(String departmentCode) {
        this.departmentCode = departmentCode;
    }

    public User getHeadOfDepartment() {
        return headOfDepartment;
    }

    public void setHeadOfDepartment(User headOfDepartment) {
        this.headOfDepartment = headOfDepartment;
        if (headOfDepartment != null) {
            this.headUserId = headOfDepartment.getId();
        }
    }

    public Long getHeadUserId() {
        return headUserId;
    }

    public void setHeadUserId(Long headUserId) {
        this.headUserId = headUserId;
    }

    public List<Subject> getSubjects() {
        return subjects;
    }

    public void setSubjects(List<Subject> subjects) {
        this.subjects = subjects;
    }

    public List<Staff> getStaff() {
        return staff;
    }

    public void setStaff(List<Staff> staff) {
        this.staff = staff;
    }
}