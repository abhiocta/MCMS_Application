package happyservice.mcmb.policyService;

import java.util.List;

import happyservice.mcmb.policyEO.PolicyTypeEO;
import happyservice.mcmb.setPolicyScheme.PolicyUpdateRequest;

/**
 * Service interface for managing policy-related operations.
 */
public interface PolicyService {

    /**
     * Retrieve a list of all policy types.
     *
     * @return A list of all policy types.
     */
    List<PolicyTypeEO> getAllPolicy();

    /**
     * Add a new policy type.
     *
     * @param policy The policy type entity to be added.
     */
    void addPolicyType(PolicyTypeEO policy);

    /**
     * Update an existing policy type.
     *
     * @param policy The policy type entity to be updated.
     */
    void updatePolicyType(PolicyTypeEO policy);

    /**
     * Delete a policy type by its unique identifier.
     *
     * @param id The unique identifier of the policy type to be deleted.
     */
    void deletePolicyType(String id);

    /**
     * Find a policy type by its unique identifier.
     *
     * @param id The unique identifier of the policy type.
     * @return The policy type entity if found, otherwise null.
     */
    PolicyTypeEO findPolicyById(String id);

    /**
     * Update the visibility status of multiple policy types.
     *
     * @param policies The list of policy update requests.
     */
    void updateVisibilityOfPolicies(List<PolicyUpdateRequest> policies);
}
