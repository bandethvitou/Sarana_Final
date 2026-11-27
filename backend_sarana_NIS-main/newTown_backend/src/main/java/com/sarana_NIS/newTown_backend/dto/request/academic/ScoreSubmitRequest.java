package com.sarana_NIS.newTown_backend.dto.request.academic;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.util.ArrayList;
import java.util.List;

public class ScoreSubmitRequest {

    @Size(max = 20, message = "Term must be less than 20 characters")
    private String term;

    private String month; // Added for the frontend requirement

    @JsonProperty("classId")
    private Long classId;

    @JsonProperty("subjectId")
    private Long subjectId;

    // The backend uses classSubjectId internally, but the frontend sends classId & subjectId
    private Long classSubjectId;

    @JsonProperty("students")
    @NotEmpty(message = "At least one score is required")
    private List<ScoreEntry> scores = new ArrayList<>();

    @Size(max = 500, message = "Comment must be less than 500 characters")
    private String comment;

    public ScoreSubmitRequest() {}

    // Getters and Setters
    public String getTerm() { return term; }
    public void setTerm(String term) { this.term = term; }

    public String getMonth() { return month; }
    public void setMonth(String month) { this.month = month; }

    public Long getClassId() { return classId; }
    public void setClassId(Long classId) { this.classId = classId; }

    public Long getSubjectId() { return subjectId; }
    public void setSubjectId(Long subjectId) { this.subjectId = subjectId; }

    public Long getClassSubjectId() { return classSubjectId; }
    public void setClassSubjectId(Long classSubjectId) { this.classSubjectId = classSubjectId; }

    public List<ScoreEntry> getScores() { return scores; }
    public void setScores(List<ScoreEntry> scores) { this.scores = scores; }

    public String getComment() { return comment; }
    public void setComment(String comment) { this.comment = comment; }

    // Inner class mapping exactly to the frontend JSON
    public static class ScoreEntry {
        @NotNull(message = "Student ID is required")
        private Long studentId;

        @JsonProperty("homework")
        @Min(value = 0) @Max(value = 10)
        private Double homeworkScore;

        @JsonProperty("group_work")
        @Min(value = 0) @Max(value = 10)
        private Double groupWorkScore;

        @JsonProperty("attendance")
        @Min(value = 0) @Max(value = 10)
        private Double attendanceScore;

        @JsonProperty("activity")
        @Min(value = 0) @Max(value = 10)
        private Double activityScore;

        @JsonProperty("multiple_choice")
        @Min(value = 0) @Max(value = 20)
        private Double multipleChoiceScore;

        @JsonProperty("theory")
        @Min(value = 0) @Max(value = 20)
        private Double theoryScore;

        @JsonProperty("practice")
        @Min(value = 0) @Max(value = 20)
        private Double practiceScore;

        private String comment;

        // Getters and Setters
        public Long getStudentId() { return studentId; }
        public void setStudentId(Long studentId) { this.studentId = studentId; }

        public Double getHomeworkScore() { return homeworkScore; }
        public void setHomeworkScore(Double homeworkScore) { this.homeworkScore = homeworkScore; }

        public Double getGroupWorkScore() { return groupWorkScore; }
        public void setGroupWorkScore(Double groupWorkScore) { this.groupWorkScore = groupWorkScore; }

        public Double getAttendanceScore() { return attendanceScore; }
        public void setAttendanceScore(Double attendanceScore) { this.attendanceScore = attendanceScore; }

        public Double getActivityScore() { return activityScore; }
        public void setActivityScore(Double activityScore) { this.activityScore = activityScore; }

        public Double getMultipleChoiceScore() { return multipleChoiceScore; }
        public void setMultipleChoiceScore(Double multipleChoiceScore) { this.multipleChoiceScore = multipleChoiceScore; }

        public Double getTheoryScore() { return theoryScore; }
        public void setTheoryScore(Double theoryScore) { this.theoryScore = theoryScore; }

        public Double getPracticeScore() { return practiceScore; }
        public void setPracticeScore(Double practiceScore) { this.practiceScore = practiceScore; }

        public String getComment() { return comment; }
        public void setComment(String comment) { this.comment = comment; }
    }
}