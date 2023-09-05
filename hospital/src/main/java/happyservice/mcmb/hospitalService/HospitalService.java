package happyservice.mcmb.hospitalService;

import java.util.List;

import happyservice.mcmb.hospitalEO.HospitalEO;

/**
 * Service interface for managing hospital-related operations.
 */
public interface HospitalService {

    /**
     * Fetches a list of all hospitals.
     *
     * @return A list of all hospitals.
     */
    List<HospitalEO> fetchAllHospitals();

    /**
     * Adds a new hospital.
     *
     * @param hospital The hospital entity to be added.
     */
    void addHospital(HospitalEO hospital);

    /**
     * Updates an existing hospital.
     *
     * @param hospital The hospital entity to be updated.
     */
    void updateHospital(HospitalEO hospital);

    /**
     * Deletes a hospital by its unique identifier.
     *
     * @param id The unique identifier of the hospital to be deleted.
     */
    void deleteHospital(String id);

    /**
     * Finds a hospital by its unique identifier.
     *
     * @param id The unique identifier of the hospital.
     * @return The hospital entity if found, otherwise null.
     */
    HospitalEO findHospitalById(String id);
}
