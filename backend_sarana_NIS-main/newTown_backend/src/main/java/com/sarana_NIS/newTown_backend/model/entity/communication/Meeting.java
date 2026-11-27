package com.sarana_NIS.newTown_backend.model.entity.communication;

import com.sarana_NIS.newTown_backend.model.entity.BaseEntity;
import com.sarana_NIS.newTown_backend.model.entity.core.User;
import com.sarana_NIS.newTown_backend.model.enums.MeetingStatus;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table(name = "meetings")
public class Meeting extends BaseEntity {

    @Column(nullable = false, length = 200)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "meeting_date", nullable = false)
    private LocalDate meetingDate;

    @Column(name = "start_time", nullable = false)
    private LocalTime startTime;

    @Column(name = "end_time", nullable = false)
    private LocalTime endTime;

    @Column(length = 255)
    private String location;

    @Column(name = "meeting_link")
    private String meetingLink;

    @Column(columnDefinition = "JSONB")
    private String attendees;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private MeetingStatus status;  // ✅ Removed redundant initializer

    @ManyToOne
    @JoinColumn(name = "host_id")
    private User host;  // ✅ User import added

    @Column(columnDefinition = "TEXT")
    private String notes;

    @Column(name = "is_recurring")
    private Boolean isRecurring;

    @Column(name = "recurrence_pattern", length = 50)
    private String recurrencePattern;

    // Constructors
    public Meeting() {
        this.status = MeetingStatus.SCHEDULED;
        this.isRecurring = false;
    }

    public Meeting(String title, LocalDate meetingDate, LocalTime startTime, LocalTime endTime) {
        this.title = title;
        this.meetingDate = meetingDate;
        this.startTime = startTime;
        this.endTime = endTime;
        this.status = MeetingStatus.SCHEDULED;
        this.isRecurring = false;
    }

    // Getters and Setters
    

    

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDate getMeetingDate() {
        return meetingDate;
    }

    public void setMeetingDate(LocalDate meetingDate) {
        this.meetingDate = meetingDate;
    }

    public LocalTime getStartTime() {
        return startTime;
    }

    public void setStartTime(LocalTime startTime) {
        this.startTime = startTime;
    }

    public LocalTime getEndTime() {
        return endTime;
    }

    public void setEndTime(LocalTime endTime) {
        this.endTime = endTime;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getMeetingLink() {
        return meetingLink;
    }

    public void setMeetingLink(String meetingLink) {
        this.meetingLink = meetingLink;
    }

    public String getAttendees() {
        return attendees;
    }

    public void setAttendees(String attendees) {
        this.attendees = attendees;
    }

    public MeetingStatus getStatus() {
        return status;
    }

    public void setStatus(MeetingStatus status) {
        this.status = status;
    }

    public User getHost() {
        return host;
    }

    public void setHost(User host) {
        this.host = host;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public Boolean getIsRecurring() {
        return isRecurring;
    }

    public void setIsRecurring(Boolean isRecurring) {
        this.isRecurring = isRecurring;
    }

    public String getRecurrencePattern() {
        return recurrencePattern;
    }

    public void setRecurrencePattern(String recurrencePattern) {
        this.recurrencePattern = recurrencePattern;
    }

    // Helper methods
    public boolean isUpcoming() {
        if (status == MeetingStatus.COMPLETED || status == MeetingStatus.CANCELLED) {
            return false;
        }
        return meetingDate != null && !meetingDate.isBefore(LocalDate.now());
    }

    public boolean isToday() {
        return meetingDate != null && meetingDate.equals(LocalDate.now());
    }

    public boolean isOverdue() {
        return meetingDate != null && meetingDate.isBefore(LocalDate.now()) &&
                status != MeetingStatus.COMPLETED;
    }

    public void complete() {
        this.status = MeetingStatus.COMPLETED;
    }

    public void cancel() {
        this.status = MeetingStatus.CANCELLED;
    }

    public void reschedule() {
        this.status = MeetingStatus.SCHEDULED;
    }

    public boolean isWithinNextDays(int days) {
        if (meetingDate == null) return false;
        LocalDate now = LocalDate.now();
        LocalDate future = now.plusDays(days);
        return !meetingDate.isBefore(now) && !meetingDate.isAfter(future);
    }

    public int getDurationInMinutes() {
        if (startTime == null || endTime == null) {
            return 0;
        }
        return (int) java.time.Duration.between(startTime, endTime).toMinutes();
    }
}