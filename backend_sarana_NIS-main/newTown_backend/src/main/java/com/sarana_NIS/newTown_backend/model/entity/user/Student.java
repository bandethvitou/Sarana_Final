package com.sarana_NIS.newTown_backend.model.entity.user;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.sarana_NIS.newTown_backend.model.entity.BaseEntity;
import com.sarana_NIS.newTown_backend.model.entity.academic.Attendance;
import com.sarana_NIS.newTown_backend.model.entity.academic.Class;
import com.sarana_NIS.newTown_backend.model.entity.academic.Score;
import com.sarana_NIS.newTown_backend.model.entity.core.User;
import com.sarana_NIS.newTown_backend.model.entity.management.Department;
import com.sarana_NIS.newTown_backend.model.enums.EnrollmentStatus;
import com.sarana_NIS.newTown_backend.model.enums.Gender;
import com.sarana_NIS.newTown_backend.model.enums.Level;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "students")
public class Student extends BaseEntity {

    @Column(name = "student_id", nullable = false, unique = true, length = 50)
    private String studentId;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "name_khmer", length = 200)
    private String nameKhmer;

    @Column(name = "name_english", nullable = false, length = 200)
    private String nameEnglish;

    @Column(name = "name_arabic", length = 200)
    private String nameArabic;

    @Column(name = "date_of_birth")
    private LocalDate dateOfBirth;

    @Enumerated(EnumType.STRING)
    @Column(name = "gender")
    private Gender gender;

    @Enumerated(EnumType.STRING)
    @Column(name = "level")
    private Level level;

    @Column(name = "previous_school", length = 255)
    private String previousSchool;

    @Column(name = "medical_notes", columnDefinition = "TEXT")
    private String medicalNotes;

    @Enumerated(EnumType.STRING)
    @Column(name = "student_status")
    private EnrollmentStatus studentStatus = EnrollmentStatus.ACTIVE;

    @Column(name = "enrollment_date")
    private LocalDate enrollmentDate;

    @Column(length = 255)
    private String address;

    @Column(length = 20)
    private String phone;

    @Column(length = 100)
    private String email;

    @ManyToOne
    @JoinColumn(name = "current_class_id")
    private Class currentClass;

    @ManyToOne
    @JoinColumn(name = "department_id")
    private Department department;

    @JsonIgnore // <--- PREVENTS INFINITE LOOP IN JSON
    @ManyToMany(fetch = FetchType.LAZY) // <--- PREVENTS MASSIVE SQL QUERY
    @JoinTable(
            name = "student_parents",
            joinColumns = @JoinColumn(name = "student_id"),
            inverseJoinColumns = @JoinColumn(name = "parent_id")
    )
    private Set<Parent> parents = new HashSet<>();

    @OneToMany(mappedBy = "student")
    private List<Attendance> attendances = new ArrayList<>();

    @OneToMany(mappedBy = "student", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Score> scores = new ArrayList<>();

    public Student() {
        this.studentStatus = EnrollmentStatus.ACTIVE;
        this.enrollmentDate = LocalDate.now();
        this.parents = new HashSet<>();
        this.scores = new ArrayList<>();
    }

    public Student(String studentId, String nameEnglish) {
        this.studentId = studentId;
        this.nameEnglish = nameEnglish;
        this.studentStatus = EnrollmentStatus.ACTIVE;
        this.enrollmentDate = LocalDate.now();
        this.parents = new HashSet<>();
        this.scores = new ArrayList<>();
    }

    public void addParent(Parent parent) {
        if (this.parents == null) {
            this.parents = new HashSet<>();
        }
        this.parents.add(parent);
        if (!parent.getStudents().contains(this)) {
            parent.getStudents().add(this);
        }
    }

    public void removeParent(Parent parent) {
        if (this.parents != null) {
            this.parents.remove(parent);
            if (parent.getStudents() != null) {
                parent.getStudents().remove(this);
            }
        }
    }

    public boolean hasParent(Parent parent) {
        return this.parents != null && this.parents.contains(parent);
    }

    public Set<Parent> getParents() { return parents; }
    public void setParents(Set<Parent> parents) { this.parents = parents; }

    public void addScore(Score score) {
        if (this.scores == null) {
            this.scores = new ArrayList<>();
        }
        this.scores.add(score);
        score.setStudent(this);
    }

    public void removeScore(Score score) {
        if (this.scores != null) {
            this.scores.remove(score);
            score.setStudent(null);
        }
    }

    public List<Score> getScores() { return scores; }
    public void setScores(List<Score> scores) { this.scores = scores; }

    public Double calculateGPA() {
        if (this.scores == null || this.scores.isEmpty()) return null;
        return this.scores.stream()
                .filter(s -> s.getTotalScore() != null)
                .mapToDouble(Score::getTotalScore)
                .average()
                .orElse(0.0);
    }

    public boolean isActive() { return this.studentStatus == EnrollmentStatus.ACTIVE; }
    public boolean isGraduated() { return this.studentStatus == EnrollmentStatus.GRADUATED; }
    public boolean isDropped() { return this.studentStatus == EnrollmentStatus.DROPPED; }
    public boolean isSuspended() { return this.studentStatus == EnrollmentStatus.SUSPENDED; }
    public boolean isEnrolled() { return this.studentStatus == EnrollmentStatus.ENROLLED; }

    public String getStudentId() { return studentId; }
    public void setStudentId(String studentId) { this.studentId = studentId; }

    public User getUser() { return user; }
    public void setUser(User user) {
        this.user = user;
        if (user != null) {
            this.email = user.getEmail();
            this.phone = user.getPhone();
        }
    }

    public String getNameKhmer() { return nameKhmer; }
    public void setNameKhmer(String nameKhmer) { this.nameKhmer = nameKhmer; }

    public String getNameEnglish() { return nameEnglish; }
    public void setNameEnglish(String nameEnglish) { this.nameEnglish = nameEnglish; }

    public String getNameArabic() { return nameArabic; }
    public void setNameArabic(String nameArabic) { this.nameArabic = nameArabic; }

    public String getFullName() { return nameEnglish; }

    public LocalDate getDateOfBirth() { return dateOfBirth; }
    public void setDateOfBirth(LocalDate dateOfBirth) { this.dateOfBirth = dateOfBirth; }

    public Gender getGender() { return gender; }
    public void setGender(Gender gender) { this.gender = gender; }

    public Level getLevel() { return level; }
    public void setLevel(Level level) { this.level = level; }

    public String getPreviousSchool() { return previousSchool; }
    public void setPreviousSchool(String previousSchool) { this.previousSchool = previousSchool; }

    public String getMedicalNotes() { return medicalNotes; }
    public void setMedicalNotes(String medicalNotes) { this.medicalNotes = medicalNotes; }

    public EnrollmentStatus getStudentStatus() { return studentStatus; }
    public void setStudentStatus(EnrollmentStatus studentStatus) { this.studentStatus = studentStatus; }

    public LocalDate getEnrollmentDate() { return enrollmentDate; }
    public void setEnrollmentDate(LocalDate enrollmentDate) { this.enrollmentDate = enrollmentDate; }

    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public Class getCurrentClass() { return currentClass; }
    public void setCurrentClass(Class currentClass) { this.currentClass = currentClass; }

    public Department getDepartment() { return department; }
    public void setDepartment(Department department) { this.department = department; }

    public List<Attendance> getAttendances() { return attendances; }
    public void setAttendances(List<Attendance> attendances) { this.attendances = attendances; }
}