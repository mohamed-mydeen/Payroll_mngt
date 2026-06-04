package com.payroll.dto;

import com.payroll.entity.enums.RoleType;
import com.payroll.entity.enums.SalaryType;
import com.payroll.entity.enums.SystemRole;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class EmployeeDto {
    private Long id;
    private String name;
    private String email;
    private RoleType roleType;
    private SalaryType salaryType;
    private BigDecimal salaryAmount;
    private SystemRole systemRole;
}
