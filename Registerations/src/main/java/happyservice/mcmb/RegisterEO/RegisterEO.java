package happyservice.mcmb.RegisterEO;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

/**
 * Entity class representing the registration details.
 */
@Document("registers")
public class RegisterEO {

    @Id
    private String _id;
    private String policyId;
    private String name;
    private String empId;
    private String registerationDate;
    private String nomineeName;
    private String nomineeRelationship;
    private String status;
    private byte[] proofData;

    /**
     * Get the binary data of the proof.
     *
     * @return The proof binary data.
     */
    public byte[] getProofData() {
        return proofData;
    }

    /**
     * Set the binary data of the proof.
     *
     * @param proof The proof binary data.
     */
    public void setProofData(byte[] proof) {
        this.proofData = proof;
    }

    /**
     * Get the unique identifier of the registration.
     *
     * @return The unique identifier.
     */
    public String get_id() {
        return _id;
    }

    /**
     * Get the policy ID associated with the registration.
     *
     * @return The policy ID.
     */
    public String getPolicyId() {
        return policyId;
    }

    /**
     * Set the policy ID associated with the registration.
     *
     * @param policyId The policy ID.
     */
    public void setPolicyId(String policyId) {
        this.policyId = policyId;
    }

    /**
     * Get the employee ID associated with the registration.
     *
     * @return The employee ID.
     */
    public String getEmpId() {
        return empId;
    }

    /**
     * Set the employee ID associated with the registration.
     *
     * @param empId The employee ID.
     */
    public void setEmpId(String empId) {
        this.empId = empId;
    }

    /**
     * Get the registration date.
     *
     * @return The registration date.
     */
    public String getRegisterationDate() {
        return registerationDate;
    }

    /**
     * Set the registration date.
     *
     * @param registerationDate The registration date.
     */
    public void setRegisterationDate(String registerationDate) {
        this.registerationDate = registerationDate;
    }

    /**
     * Get the nominee's name.
     *
     * @return The nominee's name.
     */
    public String getNomineeName() {
        return nomineeName;
    }

    /**
     * Set the nominee's name.
     *
     * @param nomineeName The nominee's name.
     */
    public void setNomineeName(String nomineeName) {
        this.nomineeName = nomineeName;
    }

    /**
     * Get the nominee's relationship.
     *
     * @return The nominee's relationship.
     */
    public String getNomineeRelationship() {
        return nomineeRelationship;
    }

    /**
     * Set the nominee's relationship.
     *
     * @param nomineeRelationship The nominee's relationship.
     */
    public void setNomineeRelationship(String nomineeRelationship) {
        this.nomineeRelationship = nomineeRelationship;
    }

    /**
     * Get the status of the registration.
     *
     * @return The status.
     */
    public String getStatus() {
        return status;
    }

    /**
     * Set the status of the registration.
     *
     * @param status The status.
     */
    public void setStatus(String status) {
        this.status = status;
    }

    /**
     * Constructor to create a RegisterEO instance.
     *
     * @param policyId          The policy ID.
     * @param empId             The employee ID.
     * @param name              The name.
     * @param registerationDate The registration date.
     * @param nomineeName       The nominee's name.
     * @param nomineeRelationship The nominee's relationship.
     * @param status            The status.
     * @param proof             The proof data.
     */
    public RegisterEO(String policyId, String empId, String name, String registerationDate, String nomineeName,
            String nomineeRelationship, String status, byte[] proof) {
        super();
        this.proofData = proof;
        this.policyId = policyId;
        this.empId = empId;
        this.name = name;
        this.registerationDate = registerationDate;
        this.nomineeName = nomineeName;
        this.nomineeRelationship = nomineeRelationship;
        this.status = status;
    }

    /**
     * Default constructor for RegisterEO.
     */
    public RegisterEO() {
        super();
    }
}
