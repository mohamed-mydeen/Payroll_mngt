package com.payroll.config;

import com.payroll.entity.Employee;
import com.payroll.entity.enums.RoleType;
import com.payroll.entity.enums.SalaryType;
import com.payroll.entity.enums.SystemRole;
import com.payroll.repository.EmployeeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;

@Component
@RequiredArgsConstructor
public class DataSeeder implements CommandLineRunner {

    private final EmployeeRepository employeeRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        if (employeeRepository.findByEmail("mohamedmydeen.sd@gmail.com").isEmpty()) {
            Employee admin = Employee.builder()
                    .name("System Admin")
                    .email("mohamedmydeen.sd@gmail.com")
                    .password(passwordEncoder.encode("12345"))
                    .roleType(RoleType.OFFICE)
                    .salaryType(SalaryType.MONTHLY)
                    .salaryAmount(new BigDecimal("100000"))
                    .systemRole(SystemRole.ROLE_ADMIN)
                    .build();
            employeeRepository.save(admin);
            System.out.println("Admin user seeded.");
        }
    }
}
