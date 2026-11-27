package com.sarana_NIS.newTown_backend.model.entity.core;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.sarana_NIS.newTown_backend.model.entity.BaseEntity;
import com.sarana_NIS.newTown_backend.model.entity.user.Staff;
import com.sarana_NIS.newTown_backend.model.entity.user.Student;
import com.sarana_NIS.newTown_backend.model.enums.UserRole;
import com.sarana_NIS.newTown_backend.model.enums.UserStatus;
import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "users")
public class User extends BaseEntity {

    @Column(nullable = false, unique = true, length = 50)
    private String username;

    @Column(name = "password_hash", nullable = false)
    private String passwordHash;

    @Column(name = "first_name", nullable = false, length = 100)
    private String firstName;

    @Column(name = "last_name", nullable = false, length = 100)
    private String lastName;

    @Column(nullable = false, unique = true, length = 100)
    private String email;

    @Column(length = 20)
    private String phone;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private UserRole role;

    @Enumerated(EnumType.STRING)
    private UserStatus userStatus = UserStatus.ACTIVE;

    @Column(name = "last_login")
    private LocalDateTime lastLogin;

    @Column(name = "avatar_url")
    private String avatarUrl;

    @Column(name = "is_email_verified")
    private Boolean isEmailVerified = false;

    @Column(name = "failed_login_attempts")
    private Integer failedLoginAttempts = 0;

    @Column(name = "account_locked")
    private Boolean accountLocked = false;

    @Column(name = "lockout_time")
    private LocalDateTime lockoutTime;

    @OneToOne(mappedBy = "user")
    private Staff staff;

    @OneToOne(mappedBy = "user")
    private Student student;

    @JsonIgnore // <--- PREVENTS INFINITE LOOP IN JSON
    @ManyToMany(fetch = FetchType.LAZY) // <--- PREVENTS MASSIVE SQL QUERY
    @JoinTable(
            name = "user_roles",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id")
    )
    private Set<Role> roles = new HashSet<>();

    public User() {
        this.userStatus = UserStatus.ACTIVE;
        this.isEmailVerified = false;
        this.failedLoginAttempts = 0;
        this.accountLocked = false;
        this.roles = new HashSet<>();
    }

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public String getPasswordHash() { return passwordHash; }
    public void setPasswordHash(String passwordHash) { this.passwordHash = passwordHash; }

    public String getFirstName() { return firstName; }
    public void setFirstName(String firstName) { this.firstName = firstName; }

    public String getLastName() { return lastName; }
    public void setLastName(String lastName) { this.lastName = lastName; }

    public String getFullName() {
        if (firstName == null && lastName == null) return username;
        if (firstName == null) return lastName;
        if (lastName == null) return firstName;
        return firstName + " " + lastName;
    }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public UserRole getRole() { return role; }
    public void setRole(UserRole role) { this.role = role; }

    public UserStatus getUserStatus() { return userStatus; }
    public void setUserStatus(UserStatus userStatus) { this.userStatus = userStatus; }

    public LocalDateTime getLastLogin() { return lastLogin; }
    public void setLastLogin(LocalDateTime lastLogin) { this.lastLogin = lastLogin; }

    public String getAvatarUrl() { return avatarUrl; }
    public void setAvatarUrl(String avatarUrl) { this.avatarUrl = avatarUrl; }

    public Boolean getIsEmailVerified() { return isEmailVerified; }
    public void setIsEmailVerified(Boolean isEmailVerified) { this.isEmailVerified = isEmailVerified; }

    public Integer getFailedLoginAttempts() { return failedLoginAttempts; }
    public void setFailedLoginAttempts(Integer failedLoginAttempts) { this.failedLoginAttempts = failedLoginAttempts; }

    public Boolean getAccountLocked() { return accountLocked; }
    public void setAccountLocked(Boolean accountLocked) { this.accountLocked = accountLocked; }

    public LocalDateTime getLockoutTime() { return lockoutTime; }
    public void setLockoutTime(LocalDateTime lockoutTime) { this.lockoutTime = lockoutTime; }

    public Staff getStaff() { return staff; }
    public void setStaff(Staff staff) { this.staff = staff; }

    public Student getStudent() { return student; }
    public void setStudent(Student student) { this.student = student; }

    public Set<Role> getRoles() { return roles; }
    public void setRoles(Set<Role> roles) { this.roles = roles; }

    public void addRole(Role role) {
        if (this.roles == null) this.roles = new HashSet<>();
        this.roles.add(role);
        if (!role.getUsers().contains(this)) {
            role.getUsers().add(this);
        }
    }

    public void removeRole(Role role) {
        if (this.roles != null) {
            this.roles.remove(role);
            if (role.getUsers() != null) {
                role.getUsers().remove(this);
            }
        }
    }

    public boolean hasRole(Role role) { return this.roles != null && this.roles.contains(role); }

    public boolean isActive() { return this.userStatus == UserStatus.ACTIVE; }

    public boolean isAccountLocked() { return this.accountLocked != null && this.accountLocked; }

    public void incrementFailedLoginAttempts() {
        if (this.failedLoginAttempts == null) this.failedLoginAttempts = 0;
        this.failedLoginAttempts++;
    }

    public void resetFailedLoginAttempts() {
        this.failedLoginAttempts = 0;
        this.accountLocked = false;
        this.lockoutTime = null;
    }

    public void lockAccount() {
        this.accountLocked = true;
        this.lockoutTime = LocalDateTime.now();
    }

    public void unlockAccount() {
        this.accountLocked = false;
        this.lockoutTime = null;
        this.failedLoginAttempts = 0;
    }

    @Override
    public String toString() {
        return getFullName() + " (" + email + ")";
    }
}