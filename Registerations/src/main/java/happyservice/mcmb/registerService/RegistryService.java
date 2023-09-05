package happyservice.mcmb.registerService;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import happyservice.mcmb.RegisterEO.RegisterEO;

/**
 * Service interface for managing registration details.
 */
public interface RegistryService {

    /**
     * Fetch all registration records.
     *
     * @return A list of all registration records.
     */
    public List<RegisterEO> fetchAllRegistry();

    /**
     * Create a new registration record.
     *
     * @param policyId          The policy ID.
     * @param name              The name.
     * @param empId             The employee ID.
     * @param registerationDate The registration date.
     * @param nomineeName       The nominee's name.
     * @param nomineeRelationship The nominee's relationship.
     * @param status            The status.
     * @param proof             The proof document.
     */
    public void newRegistry(String policyId, String name, String empId, String registerationDate, String nomineeName,
            String nomineeRelationship, String status, MultipartFile proof);

    /**
     * Update the status of a registration record.
     *
     * @param id     The unique identifier of the registration record.
     * @param status The new status.
     */
    public void updateRegistry(String id, String Status);

    /**
     * Find a registration record by employee ID.
     *
     * @param empId The employee ID to search for.
     * @return The registration record with the specified employee ID.
     */
    public RegisterEO findByEmployeeId(String empId);
}
