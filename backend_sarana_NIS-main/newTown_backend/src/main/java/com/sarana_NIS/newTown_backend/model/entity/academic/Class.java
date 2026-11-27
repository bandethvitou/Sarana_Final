package com.sarana_NIS.newTown_backend.model.entity.academic;

import com.sarana_NIS.newTown_backend.model.entity.BaseEntity;
import com.sarana_NIS.newTown_backend.model.entity.core.User;
import com.sarana_NIS.newTown_backend.model.entity.user.Student;
import com.sarana_NIS.newTown_backend.model.enums.ClassStatus;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "classes")
public class Class extends BaseEntity {

    @Column(nullable = false, length = 20)
    private String name;

    @ManyToOne
    @JoinColumn(name = "level_id", nullable = false)
    private AcademicLevel level;

    @Column(length = 10)
    private String grade;

    @ManyToOne
    @JoinColumn(name = "teacher_id")
    private User teacher;

    @Column(name = "academic_year")
    private String academicYear;

    @Column(length = 50)
    private String room;

    private Integer capacity;

    @Column(name = "current_enrollment")
    private Integer currentEnrollment = 0;

    @Enumerated(EnumType.STRING)
    private ClassStatus status = ClassStatus.ACTIVE;

    @Column(columnDefinition = "JSONB")
    private String schedule;

    @OneToMany(mappedBy = "currentClass")
    private List<Student> students = new ArrayList<>();

    @OneToMany(mappedBy = "classEntity")
    private List<ClassSubject> classSubjects = new ArrayList<>();

    // Constructors
    public Class() {}

    public Class(String name, AcademicLevel level) {
        this.name = name;
        this.level = level;
    }

    // Getters and Setters
    

    

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public AcademicLevel getLevel() {
        return level;
    }

    public void setLevel(AcademicLevel level) {
        this.level = level;
    }

    public String getGrade() {
        return grade;
    }

    public void setGrade(String grade) {
        this.grade = grade;
    }

    public User getTeacher() {
        return teacher;
    }

    public void setTeacher(User teacher) {
        this.teacher = teacher;
    }

    public String getAcademicYear() {
        return academicYear;
    }

    public void setAcademicYear(String academicYear) {
        this.academicYear = academicYear;
    }

    public String getRoom() {
        return room;
    }

    public void setRoom(String room) {
        this.room = room;
    }

    public Integer getCapacity() {
        return capacity;
    }

    public void setCapacity(Integer capacity) {
        this.capacity = capacity;
    }

    public Integer getCurrentEnrollment() {
        return currentEnrollment;
    }

    public void setCurrentEnrollment(Integer currentEnrollment) {
        this.currentEnrollment = currentEnrollment;
    }

    public ClassStatus getStatus() {
        return status;
    }

    public void setStatus(ClassStatus status) {
        this.status = status;
    }

    public String getSchedule() {
        return schedule;
    }

    public void setSchedule(String schedule) {
        this.schedule = schedule;
    }

    public List<Student> getStudents() {
        return students;
    }

    public void setStudents(List<Student> students) {
        this.students = students;
    }

    public List<ClassSubject> getClassSubjects() {
        return classSubjects;
    }

    public void setClassSubjects(List<ClassSubject> classSubjects) {
        this.classSubjects = classSubjects;
    }
}