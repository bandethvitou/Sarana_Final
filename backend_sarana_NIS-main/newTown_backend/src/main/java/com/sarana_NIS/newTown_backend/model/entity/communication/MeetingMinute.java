package com.sarana_NIS.newTown_backend.model.entity.communication;

import com.sarana_NIS.newTown_backend.model.entity.BaseEntity;
import com.sarana_NIS.newTown_backend.model.entity.core.User;
import com.sarana_NIS.newTown_backend.model.enums.MinutesStatus;
import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "meeting_minutes")
public class MeetingMinute extends BaseEntity {

    @ManyToOne
    @JoinColumn(name = "meeting_id")
    private Meeting meeting;

    @Column(nullable = false, length = 200)
    private String title;

    @Column(nullable = false)
    private LocalDate date;

    @Column(columnDefinition = "JSONB")
    private String attendees;

    @Column(columnDefinition = "TEXT")
    private String content;

    @Enumerated(EnumType.STRING)
    private MinutesStatus status = MinutesStatus.DRAFT;

    // ✅ This is the correct field name for User association
    @ManyToOne
    @JoinColumn(name = "created_by_user")
    private User createdByUser;

    // ❌ Do NOT use setCreatedBy(User) - that's from BaseEntity (Long)

    // Constructors
    public MeetingMinute() {}

    public MeetingMinute(String title, LocalDate date, String content) {
        this.title = title;
        this.date = date;
        this.content = content;
    }

    // Getters and Setters
    

    

    public Meeting getMeeting() {
        return meeting;
    }

    public void setMeeting(Meeting meeting) {
        this.meeting = meeting;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public String getAttendees() {
        return attendees;
    }

    public void setAttendees(String attendees) {
        this.attendees = attendees;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public MinutesStatus getStatus() {
        return status;
    }

    public void setStatus(MinutesStatus status) {
        this.status = status;
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