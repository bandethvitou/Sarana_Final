package com.sarana_NIS.newTown_backend.model.enums;

public enum UserRole {
    DIRECTOR("Director"),
    TOP_MANAGER("Top Manager"),
    MANAGER("Manager"),
    RECEPTIONIST("Receptionist"),
    TEACHER("Teacher"),
    STUDENT("Student"),
    PARENT("Parent");

    private final String displayName;

    UserRole(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }
}