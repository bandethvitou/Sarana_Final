package com.sarana_NIS.newTown_backend.model.entity.user;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.sarana_NIS.newTown_backend.model.entity.BaseEntity;
import com.sarana_NIS.newTown_backend.model.entity.core.User;
import jakarta.persistence.*;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "parents")
public class Parent extends BaseEntity {

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "full_name", nullable = false, length = 200)
    private String fullName;

    @Column(length = 20)
    private String phone;

    @Column(length = 100)
    private String email;

    @Column(length = 255)
    private String address;

    @Column(length = 50)
    private String relationship;

    @Column(length = 100)
    private String occupation;

    @JsonIgnore // <--- PREVENTS INFINITE LOOP IN JSON
    @ManyToMany(mappedBy = "parents", fetch = FetchType.LAZY) // <--- PREVENTS MASSIVE SQL QUERY
    private Set<Student> students = new HashSet<>();

    public Parent() {
        this.students = new HashSet<>();
    }

    public Parent(String fullName, String phone, String email) {
        this.fullName = fullName;
        this.phone = phone;
        this.email = email;
        this.students = new HashSet<>();
    }

    public User getUser() { return user; }
    public void setUser(User user) {
        this.user = user;
        if (user != null) {
            this.fullName = user.getFullName();
            this.email = user.getEmail();
            this.phone = user.getPhone();
        }
    }

    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }

    public String getRelationship() { return relationship; }
    public void setRelationship(String relationship) { this.relationship = relationship; }

    public String getOccupation() { return occupation; }
    public void setOccupation(String occupation) { this.occupation = occupation; }

    public Set<Student> getStudents() { return students; }
    public void setStudents(Set<Student> students) { this.students = students; }

    public void addStudent(Student student) {
        if (this.students == null) {
            this.students = new HashSet<>();
        }
        this.students.add(student);
        if (!student.getParents().contains(this)) {
            student.getParents().add(this);
        }
    }

    public void removeStudent(Student student) {
        if (this.students != null) {
            this.students.remove(student);
            if (student.getParents() != null) {
                student.getParents().remove(this);
            }
        }
    }

    public boolean hasStudent(Student student) {
        return this.students != null && this.students.contains(student);
    }

    public boolean isActive() {
        return this.students != null && !this.students.isEmpty();
    }
}