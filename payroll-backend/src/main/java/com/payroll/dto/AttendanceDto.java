package com.payroll.dto;

import com.payroll.entity.enums.AttendanceStatus;
import lombok.Data;
import java.time.LocalDate;

@Data
public class AttendanceDto {
    private Long id;
    private Long employeeId;
    private LocalDate date;
    private AttendanceStatus status;
}
