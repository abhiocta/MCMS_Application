package happyservice.mcmb.policyServiceImpl;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Service;

import happyservice.mcmb.policyEO.PolicyTypeEO;
import happyservice.mcmb.policyRepository.PolicyRepository;
import happyservice.mcmb.policyService.PolicyService;
import happyservice.mcmb.setPolicyScheme.PolicyUpdateRequest;

/**
 * Implementation of the PolicyService interface for managing policy-related operations.
 */
@Service
public class PolicyServiceImpl implements PolicyService {

    private final PolicyRepository policyRepoRef;
    private final MongoTemplate mongoTemplate; // Inject MongoTemplate

    /**
     * Constructor to initialize PolicyServiceImpl with necessary dependencies.
     *
     * @param policyRepository The policy repository.
     * @param mongoTemplate    The MongoTemplate for direct MongoDB operations.
     */
    @Autowired
    public PolicyServiceImpl(PolicyRepository policyRepository, MongoTemplate mongoTemplate) {
        this.policyRepoRef = policyRepository;
        this.mongoTemplate = mongoTemplate;
    }

    @Override
    public List<PolicyTypeEO> getAllPolicy() {
        List<PolicyTypeEO> plist = new ArrayList<>();
        policyRepoRef.findAll().forEach(plist::add);
        return plist;
    }

    @Override
    public void addPolicyType(PolicyTypeEO policy) {
        policyRepoRef.save(policy);
    }

    @Override
    public void updatePolicyType(PolicyTypeEO policy) {
        if (policyRepoRef.existsById(policy.get_id())) {
            policyRepoRef.save(policy);
        } else {
            System.out.println("ID does not exist.");
        }
    }

    @Override
    public void deletePolicyType(String id) {
        if (policyRepoRef.existsById(id)) {
            policyRepoRef.deleteById(id);
        } else {
            System.out.println("Incorrect ID.");
        }
    }

    @Override
    public PolicyTypeEO findPolicyById(String id) {
        List<PolicyTypeEO> pList = getAllPolicy();
        for (PolicyTypeEO p : pList) {
            if (p.getPolicyId().equals(id)) {
                return p;
            }
        }
        return null;
    }

    @Override
    public void updateVisibilityOfPolicies(List<PolicyUpdateRequest> updateRequests) {
        for (PolicyUpdateRequest request : updateRequests) {
            Optional<PolicyTypeEO> optionalPolicy = policyRepoRef.findById(request.getId());
            optionalPolicy.ifPresent(policy -> {
                policy.setVisible(request.isVisible());
                policy.setEligibleRoles(request.getEligibleRoles());
                policyRepoRef.save(policy);
                System.out.println("Policy updated: " + policy.getPolicyId());
            });
        }
    }
}
