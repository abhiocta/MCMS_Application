package happyservice.mcmb.registerServiceImpl;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.gridfs.GridFsTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import happyservice.mcmb.RegisterEO.RegisterEO;
import happyservice.mcmb.registerRepository.RegisterRepository;
import happyservice.mcmb.registerService.RegistryService;

/**
 * Service implementation for managing registration details.
 */
@Service
public class RegistryServiceImpl implements RegistryService {

    private RegisterRepository RegRepoRef;
    private GridFsTemplate gridFsTemplate;

    @Autowired
    public void RegisterServiceImpl(RegisterRepository registerRepository, GridFsTemplate gridFsTemplate) {
        this.RegRepoRef = registerRepository;
        this.gridFsTemplate = gridFsTemplate;
    }

    @Override
    public List<RegisterEO> fetchAllRegistry() {
        List<RegisterEO> rList = new ArrayList<>();
        RegRepoRef.findAll().forEach(rList::add);
        return rList;
    }

    @Override
    public void updateRegistry(String id, String status) {
        if (RegRepoRef.existsById(id)) {
            RegRepoRef.findById(id).ifPresent(p -> {
                p.setStatus(status);
                RegRepoRef.save(p);
            });
        } else {
            System.out.println("Incorrect ID");
        }
    }

    @Override
    public RegisterEO findByEmployeeId(String empId) {
        return RegRepoRef.findByEmpId(empId);
    }

    @Override
    public void newRegistry(String policyId, String name, String empId, String registerationDate, String nomineeName,
            String nomineeRelationship, String status, MultipartFile proof) {
        RegisterEO registerEO = new RegisterEO();
        registerEO.setPolicyId(policyId);
        registerEO.setEmpId(empId);
        registerEO.setNomineeName(name); // Corrected the method call to setName()
        registerEO.setRegisterationDate(registerationDate);
        registerEO.setNomineeName(nomineeName);
        registerEO.setNomineeRelationship(nomineeRelationship);
        registerEO.setStatus(status);

        try {
            byte[] content = proof.getBytes();
            registerEO.setProofData(content);
            RegRepoRef.save(registerEO);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
