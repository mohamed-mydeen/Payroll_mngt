package com.payroll.controller;

import com.payroll.dto.PayrollDto;
import com.payroll.service.PayrollService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/payroll")
@RequiredArgsConstructor
@CrossOrigin("*")
public class PayrollController {

    private final PayrollService payrollService;

    @PostMapping("/generate/{employeeId}")
    public ResponseEntity<PayrollDto> generatePayroll(
            @PathVariable Long employeeId,
            @RequestParam int month,
            @RequestParam int year) {
        return ResponseEntity.ok(payrollService.generatePayroll(employeeId, month, year));
    }
}
