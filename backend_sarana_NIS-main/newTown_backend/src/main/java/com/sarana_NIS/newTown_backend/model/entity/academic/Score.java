package com.sarana_NIS.newTown_backend.model.entity.academic;

import com.sarana_NIS.newTown_backend.model.entity.BaseEntity;
import com.sarana_NIS.newTown_backend.model.entity.core.User;
import com.sarana_NIS.newTown_backend.model.entity.user.Student;
import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "scores")
public class Score extends BaseEntity {

    @ManyToOne
    @JoinColumn(name = "student_id", nullable = false)
    private Student student;

    @ManyToOne
    @JoinColumn(name = "class_subject_id", nullable = false)
    private ClassSubject classSubject;

    @Column(name = "term", length = 20)
    private String term;

    // 7 Activity Scores
    @Column(name = "homework_score")
    private Double homeworkScore;

    @Column(name = "group_work_score")
    private Double groupWorkScore;

    @Column(name = "attendance_score")
    private Double attendanceScore;

    @Column(name = "activity_score")
    private Double activityScore;

    @Column(name = "multiple_choice_score")
    private Double multipleChoiceScore;

    @Column(name = "theory_score")
    private Double theoryScore;

    @Column(name = "practice_score")
    private Double practiceScore;

    @Column(name = "comment", columnDefinition = "TEXT")
    private String comment;

    @Column(name = "total_score")
    private Double totalScore;

    @ManyToOne
    @JoinColumn(name = "submitted_by")
    private User submittedBy;

    @Column(name = "submitted_at")
    private LocalDateTime submittedAt;

    @ManyToOne
    @JoinColumn(name = "approved_by")
    private User approvedBy;

    @Column(name = "approved_at")
    private LocalDateTime approvedAt;

    // ============================================================
    // CONSTRUCTORS
    // ============================================================

    public Score() {}

    // ============================================================
    // HELPER METHOD - Calculate Total Score
    // ============================================================

    public void calculateTotalScore() {
        double total = 0.0;
        if (homeworkScore != null) total += homeworkScore;
        if (groupWorkScore != null) total += groupWorkScore;
        if (attendanceScore != null) total += attendanceScore;
        if (activityScore != null) total += activityScore;
        if (multipleChoiceScore != null) total += multipleChoiceScore;
        if (theoryScore != null) total += theoryScore;
        if (practiceScore != null) total += practiceScore;
        this.totalScore = total;
    }

    // ============================================================
    // GETTERS AND SETTERS
    // ============================================================

    

    

    public Student getStudent() {
        return student;
    }

    public void setStudent(Student student) {
        this.student = student;
    }

    public ClassSubject getClassSubject() {
        return classSubject;
    }

    public void setClassSubject(ClassSubject classSubject) {
        this.classSubject = classSubject;
    }

    public String getTerm() {
        return term;
    }

    public void setTerm(String term) {
        this.term = term;
    }

    public Double getHomeworkScore() {
        return homeworkScore;
    }

    public void setHomeworkScore(Double homeworkScore) {
        this.homeworkScore = homeworkScore;
    }

    public Double getGroupWorkScore() {
        return groupWorkScore;
    }

    public void setGroupWorkScore(Double groupWorkScore) {
        this.groupWorkScore = groupWorkScore;
    }

    public Double getAttendanceScore() {
        return attendanceScore;
    }

    public void setAttendanceScore(Double attendanceScore) {
        this.attendanceScore = attendanceScore;
    }

    public Double getActivityScore() {
        return activityScore;
    }

    public void setActivityScore(Double activityScore) {
        this.activityScore = activityScore;
    }

    public Double getMultipleChoiceScore() {
        return multipleChoiceScore;
    }

    public void setMultipleChoiceScore(Double multipleChoiceScore) {
        this.multipleChoiceScore = multipleChoiceScore;
    }

    public Double getTheoryScore() {
        return theoryScore;
    }

    public void setTheoryScore(Double theoryScore) {
        this.theoryScore = theoryScore;
    }

    public Double getPracticeScore() {
        return practiceScore;
    }

    public void setPracticeScore(Double practiceScore) {
        this.practiceScore = practiceScore;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public Double getTotalScore() {
        return totalScore;
    }

    public void setTotalScore(Double totalScore) {
        this.totalScore = totalScore;
    }

    public User getSubmittedBy() {
        return submittedBy;
    }

    public void setSubmittedBy(User submittedBy) {
        this.submittedBy = submittedBy;
    }

    public LocalDateTime getSubmittedAt() {
        return submittedAt;
    }

    public void setSubmittedAt(LocalDateTime submittedAt) {
        this.submittedAt = submittedAt;
    }

    public User getApprovedBy() {
        return approvedBy;
    }

    public void setApprovedBy(User approvedBy) {
        this.approvedBy = approvedBy;
    }

    public LocalDateTime getApprovedAt() {
        return approvedAt;
    }

    public void setApprovedAt(LocalDateTime approvedAt) {
        this.approvedAt = approvedAt;
    }
}