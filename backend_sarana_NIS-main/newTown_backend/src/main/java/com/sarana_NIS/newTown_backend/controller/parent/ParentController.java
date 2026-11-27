package com.sarana_NIS.newTown_backend.controller.parent;

import com.sarana_NIS.newTown_backend.dto.response.common.ApiResponse;
import com.sarana_NIS.newTown_backend.model.entity.user.Student;
import com.sarana_NIS.newTown_backend.repository.StudentRepository;
import com.sarana_NIS.newTown_backend.security.annotation.RequiresRole;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/parent")
@RequiresRole("PARENT")
public class ParentController {

    private final StudentRepository studentRepository;

    public ParentController(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    @GetMapping("/children")
    public ResponseEntity<ApiResponse<List<Student>>> getChildren() {
        // Because of @JsonIgnore on Parent.students, this won't infinite loop.
        List<Student> children = studentRepository.findAll();
        return ResponseEntity.ok(ApiResponse.success(children));
    }

    @GetMapping("/scores/{childId}")
    public ResponseEntity<ApiResponse<Map<String, Object>>> getChildScores(@PathVariable Long childId) {
        Map<String, Object> mockData = new HashMap<>();
        mockData.put("childId", childId);
        return ResponseEntity.ok(ApiResponse.success(mockData));
    }

    @GetMapping("/attendance/{childId}")
    public ResponseEntity<ApiResponse<Map<String, Object>>> getChildAttendance(@PathVariable Long childId) {
        Map<String, Object> mockData = new HashMap<>();
        mockData.put("childId", childId);
        return ResponseEntity.ok(ApiResponse.success(mockData));
    }

    @GetMapping("/fees/{childId}")
    public ResponseEntity<ApiResponse<Map<String, Object>>> getChildFees(@PathVariable Long childId) {
        Map<String, Object> mockData = new HashMap<>();
        mockData.put("childId", childId);
        return ResponseEntity.ok(ApiResponse.success(mockData));
    }
}