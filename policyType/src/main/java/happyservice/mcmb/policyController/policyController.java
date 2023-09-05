package happyservice.mcmb.policyController;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import happyservice.mcmb.policyEO.PolicyTypeEO;
import happyservice.mcmb.policyService.PolicyService;
import happyservice.mcmb.setPolicyScheme.PolicyUpdateRequest;

/**
 * Controller class for handling policy-related REST endpoints.
 */
@RestController
@CrossOrigin
public class policyController {

    @Autowired(required = true)
    private PolicyService policyServiceRef;

    /**
     * Fetches a list of all policy types.
     *
     * @return A list of all policy types.
     */
    @RequestMapping(value = "/get")
    public List<PolicyTypeEO> fetchAllPolicy() {
        return policyServiceRef.getAllPolicy();
    }

    /**
     * Adds a new policy type.
     *
     * @param policy The policy type entity to be added.
     */
    @PostMapping(value = "/add-policyType")
    public void addPolicy(@RequestBody PolicyTypeEO policy) {
        policyServiceRef.addPolicyType(policy);
    }

    /**
     * Updates an existing policy type.
     *
     * @param policy The policy type entity to be updated.
     */
    @PutMapping(value = "/update-policyType")
    public void updatePolicy(@RequestBody PolicyTypeEO policy) {
        policyServiceRef.updatePolicyType(policy);
    }

    /**
     * Deletes a policy type by its unique identifier.
     *
     * @param id The unique identifier of the policy type to be deleted.
     */
    @DeleteMapping(value = "/delete-policyType/{id}")
    public void deletePolicy(@PathVariable("id") String id) {
        policyServiceRef.deletePolicyType(id);
    }

    /**
     * Finds a policy type by its unique identifier.
     *
     * @param id The unique identifier of the policy type.
     * @return The policy type entity if found, otherwise null.
     */
    @GetMapping(value = "/findPolicyById/{id}")
    public PolicyTypeEO findPolicyByID(@PathVariable("id") String id) {
        return policyServiceRef.findPolicyById(id);
    }

    /**
     * Updates the visibility status of multiple policy types.
     *
     * @param updateRequests List of policy update requests.
     */
    @PutMapping("/visibility")
    public void updatePolicyVisibility(@RequestBody List<PolicyUpdateRequest> updateRequests) {
        policyServiceRef.updateVisibilityOfPolicies(updateRequests);
        System.out.println("Policy visibility updated successfully.");
    }
}
