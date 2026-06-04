package com.payroll.dto;

import com.payroll.entity.enums.LeaveStatus;
import lombok.Data;
import java.time.LocalDate;

@Data
public class LeaveRequestDto {
    private Long id;
    private Long employeeId;
    private LocalDate startDate;
    private LocalDate endDate;
    private String reason;
    private LeaveStatus status;
}
