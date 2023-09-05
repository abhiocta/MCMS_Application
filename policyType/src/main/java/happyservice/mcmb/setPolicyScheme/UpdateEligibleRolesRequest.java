package happyservice.mcmb.setPolicyScheme;

import java.util.List;

/**
 * Represents a request to update the eligible roles for a policy.
 */
public class UpdateEligibleRolesRequest {

    private String policyId;
    private List<String> eligibleRoles;

    /**
     * Constructor to create an UpdateEligibleRolesRequest instance.
     *
     * @param policyId      The unique identifier of the policy.
     * @param eligibleRoles The new eligible roles for the policy.
     */
    public UpdateEligibleRolesRequest(String policyId, List<String> eligibleRoles) {
        super();
        this.policyId = policyId;
        this.eligibleRoles = eligibleRoles;
    }

    /**
     * Get the unique identifier of the policy.
     *
     * @return The unique identifier.
     */
    public String getPolicyId() {
        return policyId;
    }

    /**
     * Set the unique identifier of the policy.
     *
     * @param policyId The unique identifier.
     */
    public void setPolicyId(String policyId) {
        this.policyId = policyId;
    }

    /**
     * Get the eligible roles for the policy.
     *
     * @return The eligible roles.
     */
    public List<String> getEligibleRoles() {
        return eligibleRoles;
    }

    /**
     * Set the eligible roles for the policy.
     *
     * @param eligibleRoles The eligible roles.
     */
    public void setEligibleRoles(List<String> eligibleRoles) {
        this.eligibleRoles = eligibleRoles;
    }

    /**
     * Default constructor for UpdateEligibleRolesRequest.
     */
    public UpdateEligibleRolesRequest() {
        super();
    }
}
