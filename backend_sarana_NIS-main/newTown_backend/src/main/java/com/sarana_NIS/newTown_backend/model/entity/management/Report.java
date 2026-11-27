package com.sarana_NIS.newTown_backend.model.entity.management;

import com.sarana_NIS.newTown_backend.model.entity.BaseEntity;
import com.sarana_NIS.newTown_backend.model.entity.core.User;
import com.sarana_NIS.newTown_backend.model.enums.ReportStatus;
import com.sarana_NIS.newTown_backend.model.enums.ReportType;
import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "reports")
public class Report extends BaseEntity {

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ReportType type;

    @Column(nullable = false, length = 255)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(columnDefinition = "TEXT")
    private String content;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ReportStatus status = ReportStatus.DRAFT;

    @ManyToOne
    @JoinColumn(name = "submitted_by")
    private User submittedBy;

    @Column(name = "submitted_date")
    private LocalDateTime submittedDate;

    @ManyToOne
    @JoinColumn(name = "submitted_to")
    private User submittedTo;

    @ManyToOne
    @JoinColumn(name = "reviewed_by")
    private User reviewedBy;

    @Column(name = "reviewed_date")
    private LocalDateTime reviewedDate;

    @Column(columnDefinition = "TEXT")
    private String feedback;

    @Column(name = "rejection_reason", columnDefinition = "TEXT")
    private String rejectionReason;

    @Column(name = "revision_notes", columnDefinition = "TEXT")
    private String revisionNotes;

    @Column(name = "revision_required")
    private Boolean revisionRequired = false;

    @ManyToOne
    @JoinColumn(name = "department_id")
    private Department department;

    @Column(name = "report_date")
    private LocalDateTime reportDate;

    @Column(name = "file_url")
    private String fileUrl;

    @Column(name = "file_name")
    private String fileName;

    @Column(name = "file_size")
    private Long fileSize;

    @Column(name = "file_type")
    private String fileType;

    @Column(name = "is_confidential")
    private Boolean isConfidential = false;

    @Column(name = "view_count")
    private Integer viewCount = 0;

    @Column(name = "download_count")
    private Integer downloadCount = 0;

    // ❌ NOT IN ENTITY - These are DTO-only fields
    // - approvedBy (use reviewedBy instead)
    // - approvedDate (use reviewedDate instead)
    // - priority
    // - reportPeriodStart
    // - reportPeriodEnd
    // - data
    // - revisionComment (use revisionNotes instead)
    // - lastViewedAt
    // - metrics
    // - executiveSummary
    // - recommendations
    // - nextSteps

    // Constructors
    public Report() {
    }

    public Report(ReportType type, String title, User submittedBy) {
        this.type = type;
        this.title = title;
        this.submittedBy = submittedBy;
        this.submittedDate = LocalDateTime.now();
        this.status = ReportStatus.DRAFT;
    }

    // Business Methods
    public void submit(User submittedTo) {
        this.status = ReportStatus.SUBMITTED;
        this.submittedTo = submittedTo;
        this.submittedDate = LocalDateTime.now();
    }

    public void approve(User reviewer) {
        this.status = ReportStatus.APPROVED;
        this.reviewedBy = reviewer;
        this.reviewedDate = LocalDateTime.now();
        this.revisionRequired = false;
    }

    public void reject(User reviewer, String reason) {
        this.status = ReportStatus.REJECTED;
        this.reviewedBy = reviewer;
        this.reviewedDate = LocalDateTime.now();
        this.rejectionReason = reason;
        this.feedback = reason;
    }

    public void requestRevision(String revisionNotes) {
        this.status = ReportStatus.UNDER_REVIEW;
        this.revisionRequired = true;
        this.revisionNotes = revisionNotes;
        this.feedback = revisionNotes;
    }

    public void incrementViewCount() {
        if (this.viewCount == null) {
            this.viewCount = 0;
        }
        this.viewCount++;
    }

    public void incrementDownloadCount() {
        if (this.downloadCount == null) {
            this.downloadCount = 0;
        }
        this.downloadCount++;
    }

    // Getters and Setters
    
    

    public ReportType getType() { return type; }
    public void setType(ReportType type) { this.type = type; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }

    public ReportStatus getStatus() { return status; }
    public void setStatus(ReportStatus status) { this.status = status; }

    public User getSubmittedBy() { return submittedBy; }
    public void setSubmittedBy(User submittedBy) { this.submittedBy = submittedBy; }

    public LocalDateTime getSubmittedDate() { return submittedDate; }
    public void setSubmittedDate(LocalDateTime submittedDate) { this.submittedDate = submittedDate; }

    public User getSubmittedTo() { return submittedTo; }
    public void setSubmittedTo(User submittedTo) { this.submittedTo = submittedTo; }

    public User getReviewedBy() { return reviewedBy; }
    public void setReviewedBy(User reviewedBy) { this.reviewedBy = reviewedBy; }

    public LocalDateTime getReviewedDate() { return reviewedDate; }
    public void setReviewedDate(LocalDateTime reviewedDate) { this.reviewedDate = reviewedDate; }

    public String getFeedback() { return feedback; }
    public void setFeedback(String feedback) { this.feedback = feedback; }

    public String getRejectionReason() { return rejectionReason; }
    public void setRejectionReason(String rejectionReason) { this.rejectionReason = rejectionReason; }

    public String getRevisionNotes() { return revisionNotes; }
    public void setRevisionNotes(String revisionNotes) { this.revisionNotes = revisionNotes; }

    public Boolean getRevisionRequired() { return revisionRequired; }
    public void setRevisionRequired(Boolean revisionRequired) { this.revisionRequired = revisionRequired; }

    public Department getDepartment() { return department; }
    public void setDepartment(Department department) { this.department = department; }

    public LocalDateTime getReportDate() { return reportDate; }
    public void setReportDate(LocalDateTime reportDate) { this.reportDate = reportDate; }

    public String getFileUrl() { return fileUrl; }
    public void setFileUrl(String fileUrl) { this.fileUrl = fileUrl; }

    public String getFileName() { return fileName; }
    public void setFileName(String fileName) { this.fileName = fileName; }

    public Long getFileSize() { return fileSize; }
    public void setFileSize(Long fileSize) { this.fileSize = fileSize; }

    public String getFileType() { return fileType; }
    public void setFileType(String fileType) { this.fileType = fileType; }

    public Boolean getIsConfidential() { return isConfidential; }
    public void setIsConfidential(Boolean isConfidential) { this.isConfidential = isConfidential; }

    public Integer getViewCount() { return viewCount; }
    public void setViewCount(Integer viewCount) { this.viewCount = viewCount; }

    public Integer getDownloadCount() { return downloadCount; }
    public void setDownloadCount(Integer downloadCount) { this.downloadCount = downloadCount; }
}