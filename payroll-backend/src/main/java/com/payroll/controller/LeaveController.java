package com.payroll.controller;

import com.payroll.dto.LeaveRequestDto;
import com.payroll.entity.enums.LeaveStatus;
import com.payroll.service.LeaveService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/leaves")
@RequiredArgsConstructor
@CrossOrigin("*")
public class LeaveController {

    private final LeaveService leaveService;

    @PostMapping
    public ResponseEntity<LeaveRequestDto> applyLeave(@RequestBody LeaveRequestDto dto) {
        return ResponseEntity.ok(leaveService.applyLeave(dto));
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<LeaveRequestDto> updateStatus(@PathVariable Long id, @RequestParam LeaveStatus status) {
        return ResponseEntity.ok(leaveService.updateLeaveStatus(id, status));
    }

    @GetMapping("/employee/{id}")
    public ResponseEntity<List<LeaveRequestDto>> getLeavesByEmployee(@PathVariable Long id) {
        return ResponseEntity.ok(leaveService.getLeavesByEmployee(id));
    }

    @GetMapping
    public ResponseEntity<List<LeaveRequestDto>> getAllLeaves() {
        return ResponseEntity.ok(leaveService.getAllLeaves());
    }
}
