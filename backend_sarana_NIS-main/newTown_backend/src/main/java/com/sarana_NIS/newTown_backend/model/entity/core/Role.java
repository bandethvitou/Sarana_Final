package com.sarana_NIS.newTown_backend.model.entity.core;

import com.sarana_NIS.newTown_backend.model.entity.BaseEntity;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "roles")
public class Role extends BaseEntity {

    @Column(nullable = false, unique = true, length = 50)
    private String name;

    @Column(length = 100)
    private String displayName;

    @Column(length = 255)
    private String description;

    @Column(length = 50)
    private String category;  // ✅ This is String, not RoleCategory enum

    @Column(name = "dashboard_route", length = 255)
    private String dashboardRoute;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "role_permissions", joinColumns = @JoinColumn(name = "role_id"))
    @Column(name = "permission")
    private List<String> permissions = new ArrayList<>();

    @ManyToMany(mappedBy = "roles")
    private Set<User> users = new HashSet<>();

    // Constructors
    public Role() {
    }

    public Role(String name, String displayName, String description) {
        this.name = name;
        this.displayName = displayName;
        this.description = description;
        this.permissions = new ArrayList<>();
    }

    // Getters and Setters
    

    

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDisplayName() {
        return displayName;
    }

    public void setDisplayName(String displayName) {
        this.displayName = displayName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getDashboardRoute() {
        return dashboardRoute;
    }

    public void setDashboardRoute(String dashboardRoute) {
        this.dashboardRoute = dashboardRoute;
    }

    public List<String> getPermissions() {
        return permissions;
    }

    public void setPermissions(List<String> permissions) {
        this.permissions = permissions;
    }

    public Set<User> getUsers() {
        return users;
    }

    public void setUsers(Set<User> users) {
        this.users = users;
    }

    // Helper methods
    public void addPermission(String permission) {
        if (this.permissions == null) {
            this.permissions = new ArrayList<>();
        }
        if (!this.permissions.contains(permission)) {
            this.permissions.add(permission);
        }
    }

    public void removePermission(String permission) {
        if (this.permissions != null) {
            this.permissions.remove(permission);
        }
    }

    public boolean hasPermission(String permission) {
        return this.permissions != null && this.permissions.contains(permission);
    }

    public boolean hasAnyPermission(List<String> requiredPermissions) {
        if (requiredPermissions == null || requiredPermissions.isEmpty()) {
            return true;
        }
        for (String permission : requiredPermissions) {
            if (hasPermission(permission)) {
                return true;
            }
        }
        return false;
    }

    public boolean hasAllPermissions(List<String> requiredPermissions) {
        if (requiredPermissions == null || requiredPermissions.isEmpty()) {
            return true;
        }
        for (String permission : requiredPermissions) {
            if (!hasPermission(permission)) {
                return false;
            }
        }
        return true;
    }
}