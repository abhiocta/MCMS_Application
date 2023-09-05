package happyservice.mcmb.policyRepository;

import org.springframework.data.mongodb.repository.MongoRepository;

import happyservice.mcmb.policyEO.PolicyTypeEO;

/**
 * Repository interface for performing database operations on policy types.
 */
public interface PolicyRepository extends MongoRepository<PolicyTypeEO, String> {

    // You can add custom query methods here if needed

}
