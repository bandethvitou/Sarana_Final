package com.sarana_NIS.newTown_backend.model.entity.academic;

import com.sarana_NIS.newTown_backend.model.entity.BaseEntity;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "academic_levels")
public class AcademicLevel extends BaseEntity {

    @Column(unique = true, nullable = false, length = 50)
    private String name;

    @Column(unique = true, nullable = false, length = 10)
    private String code;

    @Column(name = "min_age")
    private Integer minAge;

    @Column(name = "max_age")
    private Integer maxAge;

    @Column(name = "sequence_order")
    private Integer sequenceOrder;

    @OneToMany(mappedBy = "level")
    private List<Class> classes = new ArrayList<>();

    // Constructors
    public AcademicLevel() {}

    public AcademicLevel(String name, String code) {
        this.name = name;
        this.code = code;
    }

    // Getters and Setters
    

    

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public Integer getMinAge() {
        return minAge;
    }

    public void setMinAge(Integer minAge) {
        this.minAge = minAge;
    }

    public Integer getMaxAge() {
        return maxAge;
    }

    public void setMaxAge(Integer maxAge) {
        this.maxAge = maxAge;
    }

    public Integer getSequenceOrder() {
        return sequenceOrder;
    }

    public void setSequenceOrder(Integer sequenceOrder) {
        this.sequenceOrder = sequenceOrder;
    }

    public List<Class> getClasses() {
        return classes;
    }

    public void setClasses(List<Class> classes) {
        this.classes = classes;
    }
}