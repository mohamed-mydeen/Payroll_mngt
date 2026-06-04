package com.payroll.dto;

import lombok.Data;

@Data
public class AuthResponse {
    private String token;
    private Long employeeId;
    private String role;
}
