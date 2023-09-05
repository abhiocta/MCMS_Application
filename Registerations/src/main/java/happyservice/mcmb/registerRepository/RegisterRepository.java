package happyservice.mcmb.registerRepository;

import org.springframework.data.mongodb.repository.MongoRepository;

import happyservice.mcmb.RegisterEO.RegisterEO;

/**
 * Repository interface for managing registration records.
 */
public interface RegisterRepository extends MongoRepository<RegisterEO, String> {

    /**
     * Find a registration record by employee ID.
     *
     * @param empId The employee ID to search for.
     * @return The registration record with the specified employee ID.
     */
    public RegisterEO findByEmpId(String empId);
}
