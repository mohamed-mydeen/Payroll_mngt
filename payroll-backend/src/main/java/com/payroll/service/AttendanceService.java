package com.payroll.service;

import com.payroll.dto.AttendanceDto;
import com.payroll.entity.Attendance;
import com.payroll.entity.Employee;
import com.payroll.entity.enums.AttendanceStatus;
import com.payroll.repository.AttendanceRepository;
import com.payroll.repository.EmployeeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AttendanceService {

    private final AttendanceRepository attendanceRepository;
    private final EmployeeRepository employeeRepository;

    public AttendanceDto markAttendance(AttendanceDto dto) {
        Employee employee = employeeRepository.findById(dto.getEmployeeId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Employee not found"));

        // Upsert: update if exists, create if not
        Optional<Attendance> existing = attendanceRepository.findByEmployeeAndDate(employee, dto.getDate());
        Attendance attendance;
        if (existing.isPresent()) {
            attendance = existing.get();
            attendance.setStatus(dto.getStatus());
        } else {
            attendance = Attendance.builder()
                    .employee(employee)
                    .date(dto.getDate())
                    .status(dto.getStatus())
                    .build();
        }

        attendance = attendanceRepository.save(attendance);
        return mapToDto(attendance);
    }

    public List<AttendanceDto> getAttendanceByEmployee(Long employeeId) {
        return attendanceRepository.findByEmployeeId(employeeId).stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    public List<AttendanceDto> getAttendanceByEmployeeAndMonth(Long employeeId, int year, int month) {
        LocalDate start = LocalDate.of(year, month, 1);
        LocalDate end = start.withDayOfMonth(start.lengthOfMonth());
        return attendanceRepository.findByEmployeeIdAndDateBetween(employeeId, start, end).stream()
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
