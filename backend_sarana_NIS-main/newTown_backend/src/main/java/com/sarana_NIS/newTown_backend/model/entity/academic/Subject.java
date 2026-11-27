package com.sarana_NIS.newTown_backend.model.entity.academic;

import com.sarana_NIS.newTown_backend.model.entity.BaseEntity;
import com.sarana_NIS.newTown_backend.model.entity.management.Department;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "subjects")
public class Subject extends BaseEntity {

    @Column(nullable = false, length = 100)
    private String name;

    @Column(nullable = false, unique = true, length = 20)
    private String code;

    @Column(columnDefinition = "TEXT")
    private String description;

    @ManyToOne
    @JoinColumn(name = "department_id")
    private Department department;

    @Column(name = "credits")
    private Integer credits = 0;

    @OneToMany(mappedBy = "subject")
    private List<ClassSubject> classSubjects = new ArrayList<>();

    // Constructors
    public Subject() {
    }

    public Subject(String name, String code) {
        this.name = name;
        this.code = code;
        this.setIsActive(true); // FIXED: Use setter
    }

    // Getters and Setters
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Department getDepartment() {
        return department;
    }

    public void setDepartment(Department department) {
        this.department = department;
    }

    public Integer getCredits() {
        return credits;
    }

    public void setCredits(Integer credits) {
        this.credits = credits;
    }

    public List<ClassSubject> getClassSubjects() {
        return classSubjects;
    }

    public void setClassSubjects(List<ClassSubject> classSubjects) {
        this.classSubjects = classSubjects;
    }

    // Helper methods
    public boolean isActive() {
        return this.getIsActive() != null && this.getIsActive(); // FIXED: Use getter
    }

    public void deactivate() {
        this.setIsActive(false); // FIXED: Use setter
    }

    public void activate() {
        this.setIsActive(true); // FIXED: Use setter
    }
}