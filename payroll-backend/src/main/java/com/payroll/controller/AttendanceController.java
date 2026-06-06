package com.payroll.controller;

import com.payroll.dto.AttendanceDto;
import com.payroll.service.AttendanceService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/attendance")
@RequiredArgsConstructor
public class AttendanceController {

    private final AttendanceService attendanceService;

    @PostMapping
    public ResponseEntity<AttendanceDto> markAttendance(@RequestBody AttendanceDto dto) {
        return ResponseEntity.ok(attendanceService.markAttendance(dto));
    }

    @GetMapping("/employee/{id}")
    public ResponseEntity<List<AttendanceDto>> getAttendanceByEmployee(@PathVariable Long id) {
        return ResponseEntity.ok(attendanceService.getAttendanceByEmployee(id));
    }

    @GetMapping("/employee/{id}/month")
    public ResponseEntity<List<AttendanceDto>> getAttendanceByMonth(
            @PathVariable Long id,
            @RequestParam int year,
            @RequestParam int month) {
        return ResponseEntity.ok(attendanceService.getAttendanceByEmployeeAndMonth(id, year, month));
    }
}
