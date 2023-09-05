package happyservice.mcms.emp.ServiceImpl;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import happyservice.mcms.emp.EO.EmployeeEO;
import happyservice.mcms.emp.Repo.EmployeeRepository;
import happyservice.mcms.emp.Service.EmployeeService;

/**
 * Implementation of the EmployeeService interface.
 */
@Service
public class EmpServiceImpl implements EmployeeService {

    @Autowired
    private EmployeeRepository empRepo;

    @Override
    public List<EmployeeEO> getAllEmployee() {
        // Retrieve a list of all employees
        List<EmployeeEO> eList = new ArrayList<>();
        empRepo.findAll().forEach(eList::add);
        return eList;
    }

    @Override
    public Optional<EmployeeEO> getEmployeeById(String gId) {
        // Retrieve an employee by their unique ID
        return empRepo.findById(gId);
    }

    @Override
    public void updateEmployee(EmployeeEO employee) {
        if (empRepo.existsById(employee.get_id())) {
            // TODO: Update the employee information
        } else {
            System.out.println("Incorrect employee ID");
        }
    }
}
