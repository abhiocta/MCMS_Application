package happyservice.mcms.emp.Controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import happyservice.mcms.emp.EO.EmployeeEO;
import happyservice.mcms.emp.Service.EmployeeService;

/**
 * Controller class for handling employee-related endpoints.
 */
@RestController
@CrossOrigin
public class EmpController {

    @Autowired(required = true)
    private EmployeeService empServiceRef;

    /**
     * Retrieve a list of all employees.
     *
     * @return List of EmployeeEO objects representing all employees.
     */
    @RequestMapping(value = "/get")
    public List<EmployeeEO> fetchAllEmployees() {
        return empServiceRef.getAllEmployee();
    }

    /**
     * Update employee information.
     *
     * @param employee The updated EmployeeEO object.
     */
    @PutMapping(value = "/update-employee")
    public void updateEmployee(@RequestBody EmployeeEO employee) {
        empServiceRef.updateEmployee(employee);
    }

    /**
     * Find an employee by their unique ID.
     *
     * @param id The ID of the employee to find.
     * @return Optional containing the EmployeeEO object if found, otherwise empty.
     */
    @GetMapping(value = "/findEmployeeById/{id}")
    public Optional<EmployeeEO> findEmployeeById(@PathVariable("id") String id) {
        return empServiceRef.getEmployeeById(id);
    }
}
