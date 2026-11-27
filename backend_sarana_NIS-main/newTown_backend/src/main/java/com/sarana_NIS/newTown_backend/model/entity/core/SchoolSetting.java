package com.sarana_NIS.newTown_backend.model.entity.core;

import com.sarana_NIS.newTown_backend.model.entity.BaseEntity;
import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "school_settings")
public class SchoolSetting extends BaseEntity {

    @Column(name = "school_name", length = 200)
    private String schoolName;

    @Column(name = "logo_url")
    private String logoUrl;

    @Column(name = "academic_year", length = 20)
    private String academicYear;

    @Column(name = "current_term", length = 50)
    private String currentTerm;

    @Column(name = "date_format", length = 20)
    private String dateFormat;

    @Column(name = "timezone", length = 50)
    private String timezone;

    @Column(name = "school_address", length = 255)
    private String schoolAddress;

    @Column(name = "school_phone", length = 20)
    private String schoolPhone;

    @Column(name = "school_email", length = 100)
    private String schoolEmail;

    @Column(name = "principal_name", length = 100)
    private String principalName;

    @Column(name = "allow_parent_registration")
    private Boolean allowParentRegistration = false;

    @Column(name = "allow_student_registration")
    private Boolean allowStudentRegistration = false;

    @Column(name = "max_students_per_class")
    private Integer maxStudentsPerClass = 30;

    @Column(name = "enable_email_notifications")
    private Boolean enableEmailNotifications = true;

    @Column(name = "enable_sms_notifications")
    private Boolean enableSmsNotifications = false;

    @Column(name = "sms_provider", length = 50)
    private String smsProvider;

    @Column(name = "email_sender", length = 100)
    private String emailSender;

    @Column(name = "school_motto", length = 255)
    private String schoolMotto;

    @Column(name = "school_mission", columnDefinition = "TEXT")
    private String schoolMission;

    @Column(name = "school_vision", columnDefinition = "TEXT")
    private String schoolVision;

    // Constructors
    public SchoolSetting() {
        this.allowParentRegistration = false;
        this.allowStudentRegistration = false;
        this.maxStudentsPerClass = 30;
        this.enableEmailNotifications = true;
        this.enableSmsNotifications = false;
    }

    // Getters and Setters
    

    

    public String getSchoolName() {
        return schoolName;
    }

    public void setSchoolName(String schoolName) {
        this.schoolName = schoolName;
    }

    public String getLogoUrl() {
        return logoUrl;
    }

    public void setLogoUrl(String logoUrl) {
        this.logoUrl = logoUrl;
    }

    public String getAcademicYear() {
        return academicYear;
    }

    public void setAcademicYear(String academicYear) {
        this.academicYear = academicYear;
    }

    public String getCurrentTerm() {
        return currentTerm;
    }

    public void setCurrentTerm(String currentTerm) {
        this.currentTerm = currentTerm;
    }

    public String getDateFormat() {
        return dateFormat;
    }

    public void setDateFormat(String dateFormat) {
        this.dateFormat = dateFormat;
    }

    public String getTimezone() {
        return timezone;
    }

    public void setTimezone(String timezone) {
        this.timezone = timezone;
    }

    public String getSchoolAddress() {
        return schoolAddress;
    }

    public void setSchoolAddress(String schoolAddress) {
        this.schoolAddress = schoolAddress;
    }

    public String getSchoolPhone() {
        return schoolPhone;
    }

    public void setSchoolPhone(String schoolPhone) {
        this.schoolPhone = schoolPhone;
    }

    public String getSchoolEmail() {
        return schoolEmail;
    }

    public void setSchoolEmail(String schoolEmail) {
        this.schoolEmail = schoolEmail;
    }

    public String getPrincipalName() {
        return principalName;
    }

    public void setPrincipalName(String principalName) {
        this.principalName = principalName;
    }

    public Boolean getAllowParentRegistration() {
        return allowParentRegistration;
    }

    public void setAllowParentRegistration(Boolean allowParentRegistration) {
        this.allowParentRegistration = allowParentRegistration;
    }

    public Boolean getAllowStudentRegistration() {
        return allowStudentRegistration;
    }

    public void setAllowStudentRegistration(Boolean allowStudentRegistration) {
        this.allowStudentRegistration = allowStudentRegistration;
    }

    public Integer getMaxStudentsPerClass() {
        return maxStudentsPerClass;
    }

    public void setMaxStudentsPerClass(Integer maxStudentsPerClass) {
        this.maxStudentsPerClass = maxStudentsPerClass;
    }

    public Boolean getEnableEmailNotifications() {
        return enableEmailNotifications;
    }

    public void setEnableEmailNotifications(Boolean enableEmailNotifications) {
        this.enableEmailNotifications = enableEmailNotifications;
    }

    public Boolean getEnableSmsNotifications() {
        return enableSmsNotifications;
    }

    public void setEnableSmsNotifications(Boolean enableSmsNotifications) {
        this.enableSmsNotifications = enableSmsNotifications;
    }

    public String getSmsProvider() {
        return smsProvider;
    }

    public void setSmsProvider(String smsProvider) {
        this.smsProvider = smsProvider;
    }

    public String getEmailSender() {
        return emailSender;
    }

    public void setEmailSender(String emailSender) {
        this.emailSender = emailSender;
    }

    public String getSchoolMotto() {
        return schoolMotto;
    }

    public void setSchoolMotto(String schoolMotto) {
        this.schoolMotto = schoolMotto;
    }

    public String getSchoolMission() {
        return schoolMission;
    }

    public void setSchoolMission(String schoolMission) {
        this.schoolMission = schoolMission;
    }

    public String getSchoolVision() {
        return schoolVision;
    }

    public void setSchoolVision(String schoolVision) {
        this.schoolVision = schoolVision;
    }

    // Helper methods
    public boolean hasLogo() {
        return logoUrl != null && !logoUrl.isEmpty();
    }

    public boolean isEmailNotificationsEnabled() {
        return enableEmailNotifications != null && enableEmailNotifications;
    }

    public boolean isSmsNotificationsEnabled() {
        return enableSmsNotifications != null && enableSmsNotifications;
    }

    public boolean isParentRegistrationAllowed() {
        return allowParentRegistration != null && allowParentRegistration;
    }

    public boolean isStudentRegistrationAllowed() {
        return allowStudentRegistration != null && allowStudentRegistration;
    }
}