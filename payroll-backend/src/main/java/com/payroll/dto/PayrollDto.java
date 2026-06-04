package com.payroll.dto;

import lombok.Data;
import java.math.BigDecimal;

@Data
public class PayrollDto {
    private Long id;
    private Long employeeId;
    private Integer month;
    private Integer year;
    private Integer totalPresent;
    private BigDecimal calculatedSalary;
}
