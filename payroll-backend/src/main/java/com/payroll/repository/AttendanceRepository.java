package com.payroll.repository;

import com.payroll.entity.Attendance;
import com.payroll.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface AttendanceRepository extends JpaRepository<Attendance, Long> {
    List<Attendance> findByEmployeeId(Long employeeId);
    Optional<Attendance> findByEmployeeAndDate(Employee employee, LocalDate date);
    List<Attendance> findByEmployeeIdAndDateBetween(Long employeeId, LocalDate start, LocalDate end);
    int countByEmployeeIdAndDateBetweenAndStatus(Long employeeId, LocalDate start, LocalDate end, com.payroll.entity.enums.AttendanceStatus status);
}
