package happyservice.mcmb.setPolicyScheme;

/**
 * Represents a request to update policy visibility and eligible roles.
 */
public class PolicyUpdateRequest {
    private String id;
    private boolean visible;
    private String eligibleRoles;

    /**
     * Constructor to create a PolicyUpdateRequest instance.
     *
     * @param id            The unique identifier of the policy.
     * @param visible       The new visibility status.
     * @param eligibleRoles The new eligible roles for the policy.
     */
    public PolicyUpdateRequest(String id, boolean visible, String eligibleRoles) {
        super();
        this.id = id;
        this.visible = visible;
        this.eligibleRoles = eligibleRoles;
    }

    /**
     * Get the unique identifier of the policy.
     *
     * @return The unique identifier.
     */
    public String getId() {
        return id;
    }

    /**
     * Check if the policy should be visible.
     *
     * @return True if visible, false otherwise.
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
     * Get a string representation of the PolicyUpdateRequest object.
     *
     * @return A string representation of the object.
     */
    @Override
    public String toString() {
        return "PolicyUpdateRequest [id=" + id + ", visible=" + visible + ", eligibleRoles=" + eligibleRoles + "]";
    }

    /**
     * Default constructor for PolicyUpdateRequest.
     */
    public PolicyUpdateRequest() {
        super();
    }

    // Getters and setters
}
