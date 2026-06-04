package com.payroll.service;

import com.payroll.dto.EmployeeDto;
import com.payroll.entity.Employee;
import com.payroll.repository.EmployeeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class EmployeeService {

    private final EmployeeRepository employeeRepository;
    private final PasswordEncoder passwordEncoder;

    public EmployeeDto createEmployee(EmployeeDto dto) {
        Employee employee = Employee.builder()
                .name(dto.getName())
                .email(dto.getEmail())
                .password(passwordEncoder.encode("default123"))
                .roleType(dto.getRoleType())
                .salaryType(dto.getSalaryType())
                .salaryAmount(dto.getSalaryAmount())
                .systemRole(dto.getSystemRole())
                .build();
        employee = employeeRepository.save(employee);
        return mapToDto(employee);
    }

    public List<EmployeeDto> getAllEmployees() {
        return employeeRepository.findAll().stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    public EmployeeDto getEmployeeById(Long id) {
        Employee employee = employeeRepository.findById(id).orElseThrow(() -> new RuntimeException("Employee not found"));
        return mapToDto(employee);
    }

    public EmployeeDto updateEmployee(Long id, EmployeeDto dto) {
        Employee employee = employeeRepository.findById(id).orElseThrow(() -> new RuntimeException("Employee not found"));
        employee.setName(dto.getName());
        employee.setEmail(dto.getEmail());
        employee.setRoleType(dto.getRoleType());
        employee.setSalaryType(dto.getSalaryType());
        employee.setSalaryAmount(dto.getSalaryAmount());
        employee.setSystemRole(dto.getSystemRole());
        employee = employeeRepository.save(employee);
        return mapToDto(employee);
    }

    public void deleteEmployee(Long id) {
        if (!employeeRepository.existsById(id)) {
            throw new RuntimeException("Employee not found");
        }
        employeeRepository.deleteById(id);
    }

    private EmployeeDto mapToDto(Employee employee) {
        EmployeeDto dto = new EmployeeDto();
        dto.setId(employee.getId());
        dto.setName(employee.getName());
        dto.setEmail(employee.getEmail());
        dto.setRoleType(employee.getRoleType());
        dto.setSalaryType(employee.getSalaryType());
        dto.setSalaryAmount(employee.getSalaryAmount());
        dto.setSystemRole(employee.getSystemRole());
        return dto;
    }
}
