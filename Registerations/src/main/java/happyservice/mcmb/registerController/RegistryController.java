package happyservice.mcmb.registerController;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import happyservice.mcmb.RegisterEO.RegisterEO;
import happyservice.mcmb.registerService.RegistryService;
import happyservice.mcmb.registryUpdate.examineRegistry;

/**
 * Controller class for managing registration operations.
 */
@RestController
@CrossOrigin
public class RegistryController {

    @Autowired(required = true)
    private RegistryService regServiceRef;

    /**
     * Fetches all registration records.
     *
     * @return List of registration records.
     */
    @RequestMapping(value = "/get")
    public List<RegisterEO> fetchAllRegistration() {
        return regServiceRef.fetchAllRegistry();
    }

    /**
     * Adds a new registration record.
     *
     * @param policyId          The policy ID.
     * @param empId             The employee ID.
     * @param name              The name of the employee.
     * @param proof             The proof document.
     * @param registerationDate The registration date.
     * @param status            The status of the registration.
     * @param nomineeName       The nominee's name.
     * @param nomineeRelationship The nominee's relationship.
     */
    @PostMapping(value = "/add-register")
    public void addRegistration(@RequestParam String policyId,
                                @RequestParam String empId,
                                @RequestParam String name,
                                @RequestParam MultipartFile proof,
                                @RequestParam String registerationDate,
                                @RequestParam String status,
                                @RequestParam String nomineeName,
                                @RequestParam String nomineeRelationship) {
        regServiceRef.newRegistry(policyId, name, empId, registerationDate, nomineeName, nomineeRelationship, status, proof);
    }

    /**
     * Updates the status of a registration record.
     *
     * @param registry The registration update request.
     */
    @PutMapping(value = "/update-registeration")
    public void updateRegistry(@RequestBody examineRegistry registry) {
        regServiceRef.updateRegistry(registry.get_id(), registry.getStatus());
    }

    /**
     * Finds a registration record by employee ID.
     *
     * @param empId The employee ID.
     * @return The registration record with the specified employee ID.
     */
    @GetMapping(value = "/findregistry/{empId}")
    public RegisterEO findRegistry(@PathVariable("empId") String empId) {
        return regServiceRef.findByEmployeeId(empId);
    }

    /**
     * Retrieves a PDF document associated with a registration record.
     *
     * @param fileId The ID of the registration record.
     * @return ResponseEntity containing the PDF document as a Resource.
     * @throws IOException If there's an issue reading the document.
     */
    @GetMapping("/get/{fileId}")
    public ResponseEntity<Resource> getPdf(@PathVariable String fileId) throws IOException {
        RegisterEO registerEO = regServiceRef.findByEmployeeId(fileId);

        if (registerEO != null) {
            Resource resource = new ByteArrayResource(registerEO.getProofData());

            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; fileId=\"" + registerEO.getNomineeName() + "\"")
                    .contentType(MediaType.APPLICATION_OCTET_STREAM)
                    .contentLength(registerEO.getProofData().length)
                    .body(resource);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
