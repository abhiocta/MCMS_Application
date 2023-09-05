package happyservice.mcmb.hospitalRepository;

import org.springframework.data.mongodb.repository.MongoRepository;

import happyservice.mcmb.hospitalEO.HospitalEO;

/**
 * Repository interface for managing Hospital entities in the database.
 */
public interface HospitalRepository extends MongoRepository<HospitalEO, String>{

}
