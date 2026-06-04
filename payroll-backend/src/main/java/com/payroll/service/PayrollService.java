package com.payroll.service;

import com.payroll.dto.PayrollDto;
import com.payroll.entity.Employee;
import com.payroll.entity.Payroll;
import com.payroll.entity.enums.AttendanceStatus;
import com.payroll.entity.enums.SalaryType;
import com.payroll.repository.AttendanceRepository;
import com.payroll.repository.EmployeeRepository;
import com.payroll.repository.PayrollRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PayrollService {

    private final PayrollRepository payrollRepository;
    private final EmployeeRepository employeeRepository;
    private final AttendanceRepository attendanceRepository;

    public PayrollDto generatePayroll(Long employeeId, int month, int year) {
        Employee employee = employeeRepository.findById(employeeId)
                .orElseThrow(() -> new RuntimeException("Employee not found"));

        LocalDate startDate = LocalDate.of(year, month, 1);
        LocalDate endDate = startDate.withDayOfMonth(startDate.lengthOfMonth());

        int presentDays = attendanceRepository.countByEmployeeIdAndDateBetweenAndStatus(
                employeeId, startDate, endDate, AttendanceStatus.PRESENT);

        BigDecimal calculatedSalary = calculateSalary(employee, presentDays);

        Optional<Payroll> existingPayroll = payrollRepository.findByEmployeeIdAndMonthAndYear(employeeId, month, year);
        Payroll payroll;
        if (existingPayroll.isPresent()) {
            payroll = existingPayroll.get();
            payroll.setTotalPresent(presentDays);
            payroll.setCalculatedSalary(calculatedSalary);
        } else {
            payroll = Payroll.builder()
                    .employee(employee)
                    .month(month)
                    .year(year)
                    .totalPresent(presentDays)
                    .calculatedSalary(calculatedSalary)
                    .build();
        }

        payroll = payrollRepository.save(payroll);
        return mapToDto(payroll);
    }

    private BigDecimal calculateSalary(Employee employee, int presentDays) {
        if (employee.getSalaryType() == SalaryType.DAILY) {
            return employee.getSalaryAmount().multiply(new BigDecimal(presentDays));
        } else {
            // MONTHLY: (Monthly Salary / 30) × Present Days
            BigDecimal perDay = employee.getSalaryAmount().divide(new BigDecimal(30), 2, RoundingMode.HALF_UP);
            return perDay.multiply(new BigDecimal(presentDays));
        }
    }

    private PayrollDto mapToDto(Payroll payroll) {
        PayrollDto dto = new PayrollDto();
        dto.setId(payroll.getId());
        dto.setEmployeeId(payroll.getEmployee().getId());
        dto.setMonth(payroll.getMonth());
        dto.setYear(payroll.getYear());
        dto.setTotalPresent(payroll.getTotalPresent());
        dto.setCalculatedSalary(payroll.getCalculatedSalary());
        return dto;
    }
}
