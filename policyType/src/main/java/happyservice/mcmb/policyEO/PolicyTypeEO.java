package happyservice.mcmb.policyEO;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

/**
 * Represents a policy type entity in the application.
 */
@Document("policies")
public class PolicyTypeEO {

    @Id
    private String _id;
    private String policyType;
    private String maxCoverageLimit;
    private boolean visible;
    private String policyId;
    private String eligibleRoles;
    private String coverageDetails;
    private String coverageExclusion;
    private String name;

    /**
     * Constructor to create a new PolicyTypeEO instance with all attributes.
     *
     * @param policyType        The type of the policy.
     * @param maxCoverageLimit  The maximum coverage limit.
     * @param visible           The visibility status.
     * @param eligibleRoles     The eligible roles for the policy.
     * @param policyId          The unique identifier for the policy.
     * @param coverageDetails   The coverage details.
     * @param coverageExclusion The coverage exclusion details.
     * @param name              The name of the policy.
     */
    public PolicyTypeEO(String policyType, String maxCoverageLimit, boolean visible, String eligibleRoles,
                        String policyId, String coverageDetails, String coverageExclusion, String name) {
        super();
        this.eligibleRoles = eligibleRoles;
        this.policyType = policyType;
        this.maxCoverageLimit = maxCoverageLimit;
        this.visible = visible;
        this.policyId = policyId;
        this.coverageDetails = coverageDetails;
        this.coverageExclusion = coverageExclusion;
        this.name = name;
    }

    /**
     * Get the unique identifier of the policy.
     *
     * @return The unique identifier.
     */
    public String get_id() {
        return _id;
    }

    /**
     * Get the name of the policy.
     *
     * @return The name of the policy.
     */
    public String getName() {
        return name;
    }

    /**
     * Set the name of the policy.
     *
     * @param name The name of the policy.
     */
    public void setName(String name) {
        this.name = name;
    }

    /**
     * Get the type of the policy.
     *
     * @return The type of the policy.
     */
    public String getPolicyType() {
        return policyType;
    }

    /**
     * Set the type of the policy.
     *
     * @param policyType The type of the policy.
     */
    public void setPolicyType(String policyType) {
        this.policyType = policyType;
    }

    /**
     * Get the maximum coverage limit of the policy.
     *
     * @return The maximum coverage limit.
     */
    public String getMaxCoverageLimit() {
        return maxCoverageLimit;
    }

    /**
     * Set the maximum coverage limit of the policy.
     *
     * @param maxCoverageLimit The maximum coverage limit.
     */
    public void setMaxCoverageLimit(String maxCoverageLimit) {
        this.maxCoverageLimit = maxCoverageLimit;
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
     * Get the coverage exclusion details of the policy.
     *
     * @return The coverage exclusion details.
     */
    public String getCoverageExclusion() {
        return coverageExclusion;
    }

    /**
     * Set the coverage exclusion details of the policy.
     *
     * @param coverageExclusion The coverage exclusion details.
     */
    public void setCoverageExclusion(String coverageExclusion) {
        this.coverageExclusion = coverageExclusion;
    }

    /**
     * Get the eligible roles for the policy.
     *
     * @return The eligible roles.
     */
    public String getEligibleRoles() {
        return eligibleRoles;
    }

    /**
     * Set the eligible roles for the policy.
     *
     * @param eligibleRoles The eligible roles.
     */
    public void setEligibleRoles(String eligibleRoles) {
        this.eligibleRoles = eligibleRoles;
    }

    /**
     * Get the visibility status of the policy.
     *
     * @return The visibility status.
     */
    public boolean isVisible() {
        return visible;
    }

    /**
     * Set the visibility status of the policy.
     *
     * @param visible The visibility status.
     */
    public void setVisible(boolean visible) {
        this.visible = visible;
    }

    /**
     * Get the coverage details of the policy.
     *
     * @return The coverage details.
     */
    public String getCoverageDetails() {
        return coverageDetails;
    }

    /**
     * Set the coverage details of the policy.
     *
     * @param coverageDetails The coverage details.
     */
    public void setCoverageDetails(String coverageDetails) {
        this.coverageDetails = coverageDetails;
    }

    /**
     * Default constructor for PolicyTypeEO.
     */
    public PolicyTypeEO() {
        super();
    }

    /**
     * Get a string representation of the PolicyTypeEO object.
     *
     * @return A string representation of the object.
     */
    @Override
    public String toString() {
        return "PolicyTypeEO [_id=" + _id + ", policyType=" + policyType + ", maxCoverageLimit=" + maxCoverageLimit
               + ", visible=" + visible + ", policyId=" + policyId + ", eligibleRoles=" + eligibleRoles
               + ", coverageDetails=" + coverageDetails + ", coverageExclusion=" + coverageExclusion + ", name=" + name
               + "]";
    }
}
