package com.payroll.service;

import com.payroll.dto.AttendanceDto;
import com.payroll.entity.Attendance;
import com.payroll.entity.Employee;
import com.payroll.repository.AttendanceRepository;
import com.payroll.repository.EmployeeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AttendanceService {

    private final AttendanceRepository attendanceRepository;
    private final EmployeeRepository employeeRepository;

    public AttendanceDto markAttendance(AttendanceDto dto) {
        Employee employee = employeeRepository.findById(dto.getEmployeeId())
                .orElseThrow(() -> new RuntimeException("Employee not found"));

        // Check for existing attendance on same date
        attendanceRepository.findByEmployeeAndDate(employee, dto.getDate())
                .ifPresent(a -> { throw new RuntimeException("Attendance already marked for this date"); });

        Attendance attendance = Attendance.builder()
                .employee(employee)
                .date(dto.getDate())
                .status(dto.getStatus())
                .build();

        attendance = attendanceRepository.save(attendance);
        return mapToDto(attendance);
    }

    public List<AttendanceDto> getAttendanceByEmployee(Long employeeId) {
        return attendanceRepository.findByEmployeeId(employeeId).stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    private AttendanceDto mapToDto(Attendance attendance) {
        AttendanceDto dto = new AttendanceDto();
        dto.setId(attendance.getId());
        dto.setEmployeeId(attendance.getEmployee().getId());
        dto.setDate(attendance.getDate());
        dto.setStatus(attendance.getStatus());
        return dto;
    }
}
