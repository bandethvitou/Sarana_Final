package com.sarana_NIS.newTown_backend.service.dashboard;

import com.sarana_NIS.newTown_backend.dto.response.core.DashboardStatsResponse;
import com.sarana_NIS.newTown_backend.model.enums.EnrollmentStatus;
import com.sarana_NIS.newTown_backend.repository.FeeRepository;
import com.sarana_NIS.newTown_backend.repository.GoalRepository;
import com.sarana_NIS.newTown_backend.repository.StaffRepository;
import com.sarana_NIS.newTown_backend.repository.StudentRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class DirectorDashboardService {

    private static final Logger log = LoggerFactory.getLogger(DirectorDashboardService.class);

    private final StudentRepository studentRepository;
    private final StaffRepository staffRepository;
    private final FeeRepository feeRepository;
    private final GoalRepository goalRepository;

    public DirectorDashboardService(StudentRepository studentRepository,
                                    StaffRepository staffRepository,
                                    FeeRepository feeRepository,
                                    GoalRepository goalRepository) {
        this.studentRepository = studentRepository;
        this.staffRepository = staffRepository;
        this.feeRepository = feeRepository;
        this.goalRepository = goalRepository;
    }

    @Transactional(readOnly = true)
    public DashboardStatsResponse getDashboardStats() {
        log.info("Fetching director dashboard statistics");

        DashboardStatsResponse response = new DashboardStatsResponse();

        // Quick Stats
        DashboardStatsResponse.QuickStats quickStats = new DashboardStatsResponse.QuickStats();
        quickStats.setTotalStudents((int) studentRepository.count());
        quickStats.setTotalStaff((int) staffRepository.count());
        quickStats.setTotalTeachers((int) staffRepository.count());
        quickStats.setTotalParents((int) studentRepository.count()); // Stubbed
        quickStats.setTotalClasses(0); // Stubbed
        quickStats.setTotalDepartments(0); // Stubbed
        response.setQuickStats(quickStats);

        // Academic Stats
        DashboardStatsResponse.AcademicStats academicStats = new DashboardStatsResponse.AcademicStats();
        academicStats.setPresentToday(0);
        academicStats.setAbsentToday(0);
        academicStats.setLateToday(0);
        academicStats.setOverallAttendanceRate(0.0);
        academicStats.setAverageScore(0.0);
        academicStats.setAtRiskStudents(0);
        academicStats.setHomeworkPending(0);
        response.setAcademicStats(academicStats);

        // Finance Stats
        DashboardStatsResponse.FinanceStats financeStats = new DashboardStatsResponse.FinanceStats();
        BigDecimal totalFees = feeRepository.sumTotalCollected();
        BigDecimal totalOutstanding = feeRepository.sumTotalOutstanding();

        financeStats.setTotalFeesCollected(totalFees != null ? totalFees.doubleValue() : 0.0);
        financeStats.setTotalFeesOutstanding(totalOutstanding != null ? totalOutstanding.doubleValue() : 0.0);
        financeStats.setTotalExpenses(0.0);
        financeStats.setTotalBillsPending(0.0);
        financeStats.setTotalSalariesPaid(0.0);

        Long defaultersCount = feeRepository.countDefaulters();
        financeStats.setFeeDefaultersCount(defaultersCount != null ? defaultersCount.intValue() : 0);
        response.setFinanceStats(financeStats);

        // HR Stats (Phase 2 - Stubbed)
        DashboardStatsResponse.HRStats hrStats = new DashboardStatsResponse.HRStats();
        hrStats.setLeaveRequestsPending(0);
        hrStats.setHiringRequestsPending(0);
        hrStats.setStaffOnLeave(0);
        hrStats.setBirthdaysThisWeek(0);
        response.setHrStats(hrStats);

        // IT Stats (Phase 2 - Stubbed)
        DashboardStatsResponse.ITStats itStats = new DashboardStatsResponse.ITStats();
        itStats.setOpenTickets(0);
        itStats.setEquipmentUnderRepair(0);
        itStats.setServersOnline(0);
        itStats.setSystemUptime(99.9);
        response.setItStats(itStats);

        // Recent Activities
        List<DashboardStatsResponse.RecentActivity> recentActivities = new ArrayList<>();
        response.setRecentActivities(recentActivities);

        // Alerts
        List<DashboardStatsResponse.Alert> alerts = new ArrayList<>();
        alerts.add(createAlert("INFO", "System running normally", "View Dashboard", "/director/dashboard"));
        response.setAlerts(alerts);

        return response;
    }

    @Transactional(readOnly = true)
    public Map<String, Object> getEnrollmentStats() {
        log.info("Fetching enrollment statistics");

        Map<String, Object> stats = new HashMap<>();

        long totalStudents = studentRepository.count();
        long activeStudents = studentRepository.countByStatus(EnrollmentStatus.ACTIVE);
        long graduatedStudents = studentRepository.countByStatus(EnrollmentStatus.GRADUATED);
        long droppedStudents = studentRepository.countByStatus(EnrollmentStatus.DROPPED);
        long transferredStudents = studentRepository.countByStatus(EnrollmentStatus.TRANSFERRED);

        stats.put("totalStudents", totalStudents);
        stats.put("activeStudents", activeStudents);
        stats.put("graduatedStudents", graduatedStudents);
        stats.put("droppedStudents", droppedStudents);
        stats.put("transferredStudents", transferredStudents);

        return stats;
    }

    @Transactional(readOnly = true)
    public Map<String, Object> getFinanceOverview() {
        log.info("Fetching finance overview");

        Map<String, Object> overview = new HashMap<>();

        BigDecimal totalCollected = feeRepository.sumTotalCollected();
        BigDecimal totalOutstanding = feeRepository.sumTotalOutstanding();

        overview.put("totalCollected", totalCollected != null ? totalCollected.doubleValue() : 0.0);
        overview.put("totalOutstanding", totalOutstanding != null ? totalOutstanding.doubleValue() : 0.0);
        overview.put("totalBillsPending", 0.0);

        Long defaultersCount = feeRepository.countDefaulters();
        overview.put("defaultersCount", defaultersCount != null ? defaultersCount.intValue() : 0);

        return overview;
    }

    @Transactional(readOnly = true)
    public List<DashboardStatsResponse.Alert> getAlerts() {
        log.info("Fetching director alerts");

        List<DashboardStatsResponse.Alert> alerts = new ArrayList<>();

        long overdueFees = 0;
        try {
            overdueFees = feeRepository.countOverdueFees();
        } catch (Exception e) {
            log.warn("countOverdueFees method not available in FeeRepository");
        }

        if (overdueFees > 0) {
            alerts.add(createAlert(
                    "CRITICAL",
                    overdueFees + " students have overdue fees",
                    "View Defaulters",
                    "/director/users/defaulters"
            ));
        }

        List<?> overdueGoals = goalRepository.findOverdueGoals(LocalDate.now());
        if (!overdueGoals.isEmpty()) {
            alerts.add(createAlert(
                    "CRITICAL",
                    overdueGoals.size() + " goals are overdue",
                    "View Goals",
                    "/director/goals"
            ));
        }

        return alerts;
    }

    private DashboardStatsResponse.Alert createAlert(String type, String message, String action, String link) {
        DashboardStatsResponse.Alert alert = new DashboardStatsResponse.Alert();
        alert.setType(type);
        alert.setMessage(message);
        alert.setAction(action);
        alert.setLink(link);
        alert.setIsRead(false);
        return alert;
    }
}