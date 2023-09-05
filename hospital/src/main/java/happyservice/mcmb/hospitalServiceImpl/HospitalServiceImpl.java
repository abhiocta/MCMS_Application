package happyservice.mcmb.hospitalServiceImpl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import happyservice.mcmb.hospitalEO.HospitalEO;
import happyservice.mcmb.hospitalRepository.HospitalRepository;
import happyservice.mcmb.hospitalService.HospitalService;

/**
 * Implementation of the HospitalService interface for managing hospital-related operations.
 */
@Service
public class HospitalServiceImpl implements HospitalService {

    @Autowired
    private HospitalRepository hospRepo;

    @Override
    public List<HospitalEO> fetchAllHospitals() {
        List<HospitalEO> hList = new ArrayList<>();
        hospRepo.findAll().forEach(hList::add);
        return hList;
    }

    @Override
    public void addHospital(HospitalEO hospital) {
        hospRepo.save(hospital);
    }

    @Override
    public void updateHospital(HospitalEO hospital) {
        if (hospRepo.existsById(hospital.get_id())) {
            hospRepo.save(hospital);
        } else {
            System.out.println("Hospital ID does not exist.");
        }
    }

    @Override
    public void deleteHospital(String id) {
        if (hospRepo.existsById(id)) {
            hospRepo.deleteById(id);
        } else {
            System.out.println("Hospital ID is incorrect.");
        }
    }

    @Override
    public HospitalEO findHospitalById(String id) {
        List<HospitalEO> hList = fetchAllHospitals();
        for (HospitalEO h : hList) {
            if (h.getHospitalId().equals(id)) {
                return h;
            }
        }
        return null;
    }
}
