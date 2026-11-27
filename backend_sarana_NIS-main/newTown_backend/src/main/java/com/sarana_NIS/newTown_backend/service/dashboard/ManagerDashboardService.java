package com.sarana_NIS.newTown_backend.service.dashboard;

import com.sarana_NIS.newTown_backend.model.enums.EmployeeStatus;
import com.sarana_NIS.newTown_backend.repository.LeaveRequestRepository;
import com.sarana_NIS.newTown_backend.repository.StaffRepository;
import com.sarana_NIS.newTown_backend.repository.TaskRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.Map;

@Service
public class ManagerDashboardService {

    private static final Logger log = LoggerFactory.getLogger(ManagerDashboardService.class);

    private final StaffRepository staffRepository;
    private final LeaveRequestRepository leaveRequestRepository;
    private final TaskRepository taskRepository;

    public ManagerDashboardService(StaffRepository staffRepository,
                                   LeaveRequestRepository leaveRequestRepository,
                                   TaskRepository taskRepository) {
        this.staffRepository = staffRepository;
        this.leaveRequestRepository = leaveRequestRepository;
        this.taskRepository = taskRepository;
    }

    @Transactional(readOnly = true)
    public Map<String, Object> getDashboardStats() {
        log.info("Fetching manager dashboard statistics");

        Map<String, Object> stats = new HashMap<>();

        stats.put("totalStaff", staffRepository.count());
        stats.put("activeStaff", staffRepository.countByStatus(EmployeeStatus.ACTIVE));
        stats.put("pendingLeaves", leaveRequestRepository.countPendingLeaves());
        stats.put("pendingHiring", 0); // Removed HiringRequestRepository
        stats.put("pendingTasks", taskRepository.countActiveTasks());
        stats.put("completedTasks", taskRepository.countCompletedTasks());

        return stats;
    }

    @Transactional(readOnly = true)
    public Map<String, Object> getTeamStats() {
        log.info("Fetching team statistics");

        Map<String, Object> stats = new HashMap<>();
        stats.put("totalStaff", staffRepository.count());
        stats.put("activeStaff", staffRepository.countByStatus(EmployeeStatus.ACTIVE));
        stats.put("staffOnLeave", 0);

        return stats;
    }

    @Transactional(readOnly = true)
    public Map<String, Object> getPendingItems() {
        log.info("Fetching pending items");

        Map<String, Object> items = new HashMap<>();
        items.put("pendingLeaves", leaveRequestRepository.countPendingLeaves());
        items.put("pendingHiring", 0); // Removed HiringRequestRepository
        items.put("pendingTasks", taskRepository.countActiveTasks());

        return items;
    }
}