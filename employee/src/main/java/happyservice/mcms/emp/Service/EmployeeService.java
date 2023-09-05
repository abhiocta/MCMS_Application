package happyservice.mcms.emp.Service;

import java.util.List;
import java.util.Optional;

import happyservice.mcms.emp.EO.EmployeeEO;

/**
 * Service interface for managing EmployeeEO entities.
 */
public interface EmployeeService {

    /**
     * Retrieves a list of all employees.
     *
     * @return A list of all employees
     */
    List<EmployeeEO> getAllEmployee();

    /**
     * Retrieves an employee by their unique ID.
     *
     * @param gId The unique ID of the employee
     * @return An Optional containing the employee if found, or empty if not
     */
    Optional<EmployeeEO> getEmployeeById(String gId);

    /**
     * Updates the information of an employee.
     *
     * @param employee The updated employee information
     */
    void updateEmployee(EmployeeEO employee);
}
