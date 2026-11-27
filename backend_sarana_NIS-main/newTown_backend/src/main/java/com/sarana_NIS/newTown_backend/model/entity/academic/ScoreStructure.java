package com.sarana_NIS.newTown_backend.model.entity.academic;

import com.sarana_NIS.newTown_backend.model.entity.BaseEntity;
import com.sarana_NIS.newTown_backend.model.entity.core.User;
import com.sarana_NIS.newTown_backend.model.enums.Level;
import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "score_structures")
public class ScoreStructure extends BaseEntity {

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Level level;

    @ManyToOne
    @JoinColumn(name = "class_id")
    private Class classEntity;

    @ManyToOne
    @JoinColumn(name = "subject_id")
    private Subject subject;

    @Column(name = "academic_year", nullable = false, length = 20)
    private String academicYear;

    @Column(name = "term", nullable = false, length = 20)
    private String term;

    @Column(name = "homework_max")
    private Double homeworkMax = 10.0;

    @Column(name = "homework_weight")
    private Double homeworkWeight = 10.0;

    @Column(name = "group_work_max")
    private Double groupWorkMax = 10.0;

    @Column(name = "group_work_weight")
    private Double groupWorkWeight = 10.0;

    @Column(name = "attendance_max")
    private Double attendanceMax = 10.0;

    @Column(name = "attendance_weight")
    private Double attendanceWeight = 10.0;

    @Column(name = "activity_max")
    private Double activityMax = 10.0;

    @Column(name = "activity_weight")
    private Double activityWeight = 10.0;

    @Column(name = "multiple_choice_max")
    private Double multipleChoiceMax = 20.0;

    @Column(name = "multiple_choice_weight")
    private Double multipleChoiceWeight = 20.0;

    @Column(name = "theory_max")
    private Double theoryMax = 20.0;

    @Column(name = "theory_weight")
    private Double theoryWeight = 20.0;

    @Column(name = "practice_max")
    private Double practiceMax = 20.0;

    @Column(name = "practice_weight")
    private Double practiceWeight = 20.0;

    @Column(name = "total_max")
    private Double totalMax = 100.0;
@ManyToOne
    @JoinColumn(name = "created_by_user")
    private User createdByUser;

    @Column(name = "effective_from")
    private LocalDateTime effectiveFrom;

    @Column(name = "effective_to")
    private LocalDateTime effectiveTo;

    @Column(columnDefinition = "JSONB")
    private String gradingScale;

    @Column(columnDefinition = "TEXT")
    private String notes;

    // Constructors
    public ScoreStructure() {}

    public ScoreStructure(Level level, String academicYear, String term) {
        this.level = level;
        this.academicYear = academicYear;
        this.term = term;
    }

    // Getters and Setters
    public Level getLevel() { return level; }
    public void setLevel(Level level) { this.level = level; }

    public Class getClassEntity() { return classEntity; }
    public void setClassEntity(Class classEntity) { this.classEntity = classEntity; }

    public Subject getSubject() { return subject; }
    public void setSubject(Subject subject) { this.subject = subject; }

    public String getAcademicYear() { return academicYear; }
    public void setAcademicYear(String academicYear) { this.academicYear = academicYear; }

    public String getTerm() { return term; }
    public void setTerm(String term) { this.term = term; }

    public Double getHomeworkMax() { return homeworkMax; }
    public void setHomeworkMax(Double homeworkMax) { this.homeworkMax = homeworkMax; }

    public Double getHomeworkWeight() { return homeworkWeight; }
    public void setHomeworkWeight(Double homeworkWeight) { this.homeworkWeight = homeworkWeight; }

    public Double getGroupWorkMax() { return groupWorkMax; }
    public void setGroupWorkMax(Double groupWorkMax) { this.groupWorkMax = groupWorkMax; }

    public Double getGroupWorkWeight() { return groupWorkWeight; }
    public void setGroupWorkWeight(Double groupWorkWeight) { this.groupWorkWeight = groupWorkWeight; }

    public Double getAttendanceMax() { return attendanceMax; }
    public void setAttendanceMax(Double attendanceMax) { this.attendanceMax = attendanceMax; }

    public Double getAttendanceWeight() { return attendanceWeight; }
    public void setAttendanceWeight(Double attendanceWeight) { this.attendanceWeight = attendanceWeight; }

    public Double getActivityMax() { return activityMax; }
    public void setActivityMax(Double activityMax) { this.activityMax = activityMax; }

    public Double getActivityWeight() { return activityWeight; }
    public void setActivityWeight(Double activityWeight) { this.activityWeight = activityWeight; }

    public Double getMultipleChoiceMax() { return multipleChoiceMax; }
    public void setMultipleChoiceMax(Double multipleChoiceMax) { this.multipleChoiceMax = multipleChoiceMax; }

    public Double getMultipleChoiceWeight() { return multipleChoiceWeight; }
    public void setMultipleChoiceWeight(Double multipleChoiceWeight) { this.multipleChoiceWeight = multipleChoiceWeight; }

    public Double getTheoryMax() { return theoryMax; }
    public void setTheoryMax(Double theoryMax) { this.theoryMax = theoryMax; }

    public Double getTheoryWeight() { return theoryWeight; }
    public void setTheoryWeight(Double theoryWeight) { this.theoryWeight = theoryWeight; }

    public Double getPracticeMax() { return practiceMax; }
    public void setPracticeMax(Double practiceMax) { this.practiceMax = practiceMax; }

    public Double getPracticeWeight() { return practiceWeight; }
    public void setPracticeWeight(Double practiceWeight) { this.practiceWeight = practiceWeight; }

    public Double getTotalMax() { return totalMax; }
    public void setTotalMax(Double totalMax) { this.totalMax = totalMax; }

    
    

    public User getCreatedByUser() { return createdByUser; }
    public void setCreatedByUser(User createdByUser) { this.createdByUser = createdByUser; }

    public LocalDateTime getEffectiveFrom() { return effectiveFrom; }
    public void setEffectiveFrom(LocalDateTime effectiveFrom) { this.effectiveFrom = effectiveFrom; }

    public LocalDateTime getEffectiveTo() { return effectiveTo; }
    public void setEffectiveTo(LocalDateTime effectiveTo) { this.effectiveTo = effectiveTo; }

    public String getGradingScale() { return gradingScale; }
    public void setGradingScale(String gradingScale) { this.gradingScale = gradingScale; }

    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }

    // PrePersist and PreUpdate - ✅ FIXED: changed attentionWeight to attendanceWeight
    @PrePersist
    @PreUpdate
    public void validateWeights() {
        double totalWeight = (homeworkWeight != null ? homeworkWeight : 0) +
                (groupWorkWeight != null ? groupWorkWeight : 0) +
                (attendanceWeight != null ? attendanceWeight : 0) +
                (activityWeight != null ? activityWeight : 0) +
                (multipleChoiceWeight != null ? multipleChoiceWeight : 0) +
                (theoryWeight != null ? theoryWeight : 0) +
                (practiceWeight != null ? practiceWeight : 0);

        if (Math.abs(totalWeight - 100.0) > 0.01) {
            throw new IllegalStateException("Total weight must equal 100%. Current: " + totalWeight);
        }
    }

    // Helper method to calculate total max score
    public Double calculateTotalMax() {
        double total = (homeworkMax != null ? homeworkMax : 0) +
                (groupWorkMax != null ? groupWorkMax : 0) +
                (attendanceMax != null ? attendanceMax : 0) +
                (activityMax != null ? activityMax : 0) +
                (multipleChoiceMax != null ? multipleChoiceMax : 0) +
                (theoryMax != null ? theoryMax : 0) +
                (practiceMax != null ? practiceMax : 0);
        return total;
    }
}