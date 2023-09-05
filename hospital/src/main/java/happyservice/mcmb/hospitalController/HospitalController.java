package happyservice.mcmb.hospitalController;

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

import happyservice.mcmb.hospitalEO.HospitalEO;
import happyservice.mcmb.hospitalService.HospitalService;

/**
 * Controller class for handling hospital-related REST endpoints.
 */
@RestController
@CrossOrigin
public class HospitalController {

    @Autowired(required = true)
    private HospitalService hospServiceRef;

    /**
     * Fetches a list of all hospitals.
     *
     * @return A list of all hospitals.
     */
    @RequestMapping(value = "/get")
    public List<HospitalEO> fetchAllHospital() {
        return hospServiceRef.fetchAllHospitals();
    }

    /**
     * Adds a new hospital.
     *
     * @param hospital The hospital entity to be added.
     */
    @PostMapping(value = "/add-hospital")
    public void addHospital(@RequestBody HospitalEO hospital) {
        hospServiceRef.addHospital(hospital);
    }

    /**
     * Updates an existing hospital.
     *
     * @param hospital The hospital entity to be updated.
     */
    @PutMapping(value = "/update-hospital")
    public void updateHospital(@RequestBody HospitalEO hospital) {
        hospServiceRef.updateHospital(hospital);
    }

    /**
     * Deletes a hospital by its unique identifier.
     *
     * @param id The unique identifier of the hospital to be deleted.
     */
    @DeleteMapping(value = "/delete-hospital/{id}")
    public void deleteHospital(@PathVariable("id") String id) {
        hospServiceRef.deleteHospital(id);
    }

    /**
     * Finds a hospital by its unique identifier.
     *
     * @param id The unique identifier of the hospital.
     * @return The hospital entity if found, otherwise null.
     */
    @GetMapping(value = "/findById/{id}")
    public HospitalEO findHospitalById(@PathVariable("id") String id) {
        return hospServiceRef.findHospitalById(id);
    }
}
