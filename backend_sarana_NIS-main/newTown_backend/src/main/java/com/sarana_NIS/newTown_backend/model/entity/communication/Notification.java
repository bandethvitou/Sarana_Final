package com.sarana_NIS.newTown_backend.model.entity.communication;

import com.sarana_NIS.newTown_backend.model.entity.BaseEntity;
import com.sarana_NIS.newTown_backend.model.entity.core.User;
import com.sarana_NIS.newTown_backend.model.enums.NotificationPriority;
import com.sarana_NIS.newTown_backend.model.enums.NotificationType;
import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "notifications")
public class Notification extends BaseEntity {

    @Column(nullable = false, length = 200)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String message;

    @Enumerated(EnumType.STRING)
    @Column(name = "type", nullable = false)
    private NotificationType type;

    @Enumerated(EnumType.STRING)
    @Column(name = "priority")
    private NotificationPriority priority = NotificationPriority.MEDIUM;

    @Column(name = "link")
    private String link;

    @Column(name = "is_read")
    private Boolean isRead = false;

    @Column(name = "read_at")
    private LocalDateTime readAt;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "sent_at")
    private LocalDateTime sentAt;

    @Column(name = "expires_at")
    private LocalDateTime expiresAt;

    @Column(name = "is_archived")
    private Boolean isArchived = false;

    // Constructors
    public Notification() {
        this.isRead = false;
        this.isArchived = false;
        this.priority = NotificationPriority.MEDIUM;
        this.sentAt = LocalDateTime.now();
    }

    public Notification(String title, String message, NotificationType type, User user) {
        this.title = title;
        this.message = message;
        this.type = type;
        this.user = user;
        this.isRead = false;
        this.isArchived = false;
        this.priority = NotificationPriority.MEDIUM;
        this.sentAt = LocalDateTime.now();
    }

    // Getters and Setters
    

    

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public NotificationType getType() {
        return type;
    }

    public void setType(NotificationType type) {
        this.type = type;
    }

    public NotificationPriority getPriority() {
        return priority;
    }

    public void setPriority(NotificationPriority priority) {
        this.priority = priority;
    }

    public String getLink() {
        return link;
    }

    public void setLink(String link) {
        this.link = link;
    }

    public Boolean getIsRead() {
        return isRead;
    }

    public void setIsRead(Boolean isRead) {
        this.isRead = isRead;
    }

    public LocalDateTime getReadAt() {
        return readAt;
    }

    public void setReadAt(LocalDateTime readAt) {
        this.readAt = readAt;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public LocalDateTime getSentAt() {
        return sentAt;
    }

    public void setSentAt(LocalDateTime sentAt) {
        this.sentAt = sentAt;
    }

    public LocalDateTime getExpiresAt() {
        return expiresAt;
    }

    public void setExpiresAt(LocalDateTime expiresAt) {
        this.expiresAt = expiresAt;
    }

    public Boolean getIsArchived() {
        return isArchived;
    }

    public void setIsArchived(Boolean isArchived) {
        this.isArchived = isArchived;
    }

    // Helper methods
    public boolean isRead() {
        return isRead != null && isRead;
    }

    public boolean isUnread() {
        return !isRead();
    }

    public boolean isArchived() {
        return isArchived != null && isArchived;
    }

    public boolean isExpired() {
        return expiresAt != null && expiresAt.isBefore(LocalDateTime.now());
    }

    public boolean isHighPriority() {
        return priority == NotificationPriority.HIGH || priority == NotificationPriority.URGENT;
    }

    public void markAsRead() {
        this.isRead = true;
        this.readAt = LocalDateTime.now();
    }

    public void markAsUnread() {
        this.isRead = false;
        this.readAt = null;
    }

    public void archive() {
        this.isArchived = true;
    }

    public void unarchive() {
        this.isArchived = false;
    }
}