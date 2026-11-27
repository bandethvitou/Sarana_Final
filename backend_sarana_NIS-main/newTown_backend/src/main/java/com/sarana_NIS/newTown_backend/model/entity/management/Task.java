package com.sarana_NIS.newTown_backend.model.entity.management;

import com.sarana_NIS.newTown_backend.model.entity.BaseEntity;
import com.sarana_NIS.newTown_backend.model.entity.core.User;
import com.sarana_NIS.newTown_backend.model.enums.Priority;
import com.sarana_NIS.newTown_backend.model.enums.TaskStatus;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "tasks")
public class  Task extends BaseEntity {

    @Column(nullable = false, length = 200)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Priority priority = Priority.MEDIUM;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TaskStatus status = TaskStatus.PENDING;

    @Column(name = "due_date")
    private LocalDate dueDate;

    @ManyToOne
    @JoinColumn(name = "assigned_to")
    private User assignedTo;

    @ManyToOne
    @JoinColumn(name = "assigned_by")
    private User assignedBy;

    @Column(name = "assigned_date")
    private LocalDateTime assignedDate;

    @Column(name = "completed_at")
    private LocalDateTime completedAt;

    @Column(name = "completion_notes", columnDefinition = "TEXT")
    private String completionNotes;

    @Column(name = "is_recurring")
    private Boolean isRecurring = false;

    // Constructors
    public Task() {
        this.status = TaskStatus.PENDING;
        this.priority = Priority.MEDIUM;
        this.isRecurring = false;
        this.assignedDate = LocalDateTime.now();
    }

    public Task(String title, String description) {
        this.title = title;
        this.description = description;
        this.status = TaskStatus.PENDING;
        this.priority = Priority.MEDIUM;
        this.isRecurring = false;
        this.assignedDate = LocalDateTime.now();
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

    public Priority getPriority() {
        return priority;
    }

    public void setPriority(Priority priority) {
        this.priority = priority;
    }

    public TaskStatus getStatus() {
        return status;
    }

    public void setStatus(TaskStatus status) {
        this.status = status;
    }

    public LocalDate getDueDate() {
        return dueDate;
    }

    public void setDueDate(LocalDate dueDate) {
        this.dueDate = dueDate;
    }

    public User getAssignedTo() {
        return assignedTo;
    }

    public void setAssignedTo(User assignedTo) {
        this.assignedTo = assignedTo;
    }

    public User getAssignedBy() {
        return assignedBy;
    }

    public void setAssignedBy(User assignedBy) {
        this.assignedBy = assignedBy;
    }

    public LocalDateTime getAssignedDate() {
        return assignedDate;
    }

    public void setAssignedDate(LocalDateTime assignedDate) {
        this.assignedDate = assignedDate;
    }

    public LocalDateTime getCompletedAt() {
        return completedAt;
    }

    public void setCompletedAt(LocalDateTime completedAt) {
        this.completedAt = completedAt;
    }

    public String getCompletionNotes() {
        return completionNotes;
    }

    public void setCompletionNotes(String completionNotes) {
        this.completionNotes = completionNotes;
    }

    public Boolean getIsRecurring() {
        return isRecurring;
    }

    public void setIsRecurring(Boolean isRecurring) {
        this.isRecurring = isRecurring;
    }

    // Helper methods
    public boolean isOverdue() {
        if (status == TaskStatus.COMPLETED || status == TaskStatus.CANCELLED) {
            return false;
        }
        return dueDate != null && dueDate.isBefore(LocalDate.now());
    }

    public boolean isPending() {
        return status == TaskStatus.PENDING;
    }

    public boolean isInProgress() {
        return status == TaskStatus.IN_PROGRESS;
    }

    public boolean isCompleted() {
        return status == TaskStatus.COMPLETED;
    }

    public boolean isCancelled() {
        return status == TaskStatus.CANCELLED;
    }

    public void complete() {
        this.status = TaskStatus.COMPLETED;
        this.completedAt = LocalDateTime.now();
    }

    public void cancel() {
        this.status = TaskStatus.CANCELLED;
    }

    public void startProgress() {
        this.status = TaskStatus.IN_PROGRESS;
    }

    public void markPending() {
        this.status = TaskStatus.PENDING;
    }

    public long calculateDaysRemaining() {
        if (dueDate == null) return 0;
        if (status == TaskStatus.COMPLETED || status == TaskStatus.CANCELLED) {
            return 0;
        }
        return java.time.temporal.ChronoUnit.DAYS.between(LocalDate.now(), dueDate);
    }

    public long calculateDaysOverdue() {
        if (!isOverdue()) return 0;
        return java.time.temporal.ChronoUnit.DAYS.between(dueDate, LocalDate.now());
    }
}