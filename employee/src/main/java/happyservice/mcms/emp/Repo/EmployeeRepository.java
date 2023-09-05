package happyservice.mcms.emp.Repo;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import happyservice.mcms.emp.EO.EmployeeEO;

/**
 * Repository interface for accessing and managing EmployeeEO entities in MongoDB.
 */
@Repository
public interface EmployeeRepository extends MongoRepository<EmployeeEO, String> {

    // No additional methods defined here, as we are leveraging the default methods provided by MongoRepository
}
