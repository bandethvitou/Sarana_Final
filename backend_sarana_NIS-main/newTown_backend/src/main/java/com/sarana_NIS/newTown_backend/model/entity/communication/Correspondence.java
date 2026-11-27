package com.sarana_NIS.newTown_backend.model.entity.communication;

import com.sarana_NIS.newTown_backend.model.entity.BaseEntity;
import com.sarana_NIS.newTown_backend.model.entity.core.User;
import com.sarana_NIS.newTown_backend.model.enums.CorrespondenceFormat;
import com.sarana_NIS.newTown_backend.model.enums.CorrespondenceStatus;
import com.sarana_NIS.newTown_backend.model.enums.CorrespondenceType;
import com.sarana_NIS.newTown_backend.model.enums.Priority;
import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "correspondence")
public class Correspondence extends BaseEntity {

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private CorrespondenceType type;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private CorrespondenceFormat format;

    @Column(name = "from_to", nullable = false, length = 200)
    private String fromTo;

    @Column(nullable = false, length = 200)
    private String subject;

    @Column(columnDefinition = "TEXT")
    private String content;

    @Enumerated(EnumType.STRING)
    private Priority priority = Priority.MEDIUM;

    @Enumerated(EnumType.STRING)
    private CorrespondenceStatus status = CorrespondenceStatus.PENDING;

    @Column(nullable = false)
    private LocalDate date;

    @Column(name = "attachment_url")
    private String attachmentUrl;

    // ✅ This is the correct field for User association
    @ManyToOne
    @JoinColumn(name = "created_by_user")
    private User createdByUser;

    // ❌ Do NOT use setCreatedBy(User) - that's from BaseEntity (Long)

    // Constructors
    public Correspondence() {}

    public Correspondence(String fromTo, String subject, String content) {
        this.fromTo = fromTo;
        this.subject = subject;
        this.content = content;
        this.date = LocalDate.now();
    }

    // Getters and Setters
    

    

    public CorrespondenceType getType() {
        return type;
    }

    public void setType(CorrespondenceType type) {
        this.type = type;
    }

    public CorrespondenceFormat getFormat() {
        return format;
    }

    public void setFormat(CorrespondenceFormat format) {
        this.format = format;
    }

    public String getFromTo() {
        return fromTo;
    }

    public void setFromTo(String fromTo) {
        this.fromTo = fromTo;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Priority getPriority() {
        return priority;
    }

    public void setPriority(Priority priority) {
        this.priority = priority;
    }

    public CorrespondenceStatus getStatus() {
        return status;
    }

    public void setStatus(CorrespondenceStatus status) {
        this.status = status;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public String getAttachmentUrl() {
        return attachmentUrl;
    }

    public void setAttachmentUrl(String attachmentUrl) {
        this.attachmentUrl = attachmentUrl;
    }

    public User getCreatedByUser() {
        return createdByUser;
    }

    public void setCreatedByUser(User createdByUser) {
        this.createdByUser = createdByUser;
    }

    // ✅ Note: createdBy from BaseEntity is Long (ID)
    // Use getCreatedByUser() for User object
}