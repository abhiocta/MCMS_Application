package happyservice.mcmb.hospitalEO;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

/**
 * Represents a hospital entity in the application.
 */
@Document("hospitals")
public class HospitalEO {

    @Id
    private String _id;

    private String hospitalId;
    private String name;
    private String city;
    private String specialty;
    private String contactInfo;

    /**
     * Get the unique identifier for the hospital.
     *
     * @return The unique identifier.
     */
    public String get_id() {
        return _id;
    }

    /**
     * Get the name of the hospital.
     *
     * @return The name of the hospital.
     */
    public String getName() {
        return name;
    }

    /**
     * Set the name of the hospital.
     *
     * @param name The name of the hospital.
     */
    public void setName(String name) {
        this.name = name;
    }

    /**
     * Get the city where the hospital is located.
     *
     * @return The city of the hospital.
     */
    public String getCity() {
        return city;
    }

    /**
     * Set the city where the hospital is located.
     *
     * @param city The city of the hospital.
     */
    public void setCity(String city) {
        this.city = city;
    }

    /**
     * Get the specialty of the hospital.
     *
     * @return The specialty of the hospital.
     */
    public String getSpecialty() {
        return specialty;
    }

    /**
     * Set the specialty of the hospital.
     *
     * @param specialty The specialty of the hospital.
     */
    public void setSpecialty(String specialty) {
        this.specialty = specialty;
    }

    /**
     * Get the contact information for the hospital.
     *
     * @return The contact information.
     */
    public String getContactInfo() {
        return contactInfo;
    }

    /**
     * Set the contact information for the hospital.
     *
     * @param contactInfo The contact information.
     */
    public void setContactInfo(String contactInfo) {
        this.contactInfo = contactInfo;
    }

    /**
     * Constructor to create a new HospitalEO instance.
     *
     * @param name        The name of the hospital.
     * @param hId         The hospital Id of the hospital.
     * @param city        The city where the hospital is located.
     * @param specialty   The specialty of the hospital.
     * @param contactInfo The contact information for the hospital.
     */
    public HospitalEO(String name, String hId, String city, String specialty, String contactInfo) {
        this.name = name;
        this.hospitalId = hId;
        this.city = city;
        this.specialty = specialty;
        this.contactInfo = contactInfo;
    }

    /**
     * Default constructor for HospitalEO.
     */
    public HospitalEO() {
        // Default constructor
    }

    /**
     * Get a string representation of the HospitalEO object.
     *
     * @return A string representation of the object.
     */
    @Override
    public String toString() {
        return "HospitalEO [_id=" + _id + ", name=" + name + ", hospitalId=" + hospitalId + ", city=" + city +
               ", specialty=" + specialty + ", contactInfo=" + contactInfo + "]";
    }

    /**
     * Get the hospital's Id identifier.
     *
     * @return The hospital's Id identifier.
     */
    public String getHospitalId() {
        return hospitalId;
    }

    /**
     * Set the hospital's Id identifier.
     *
     * @param hospitalId The hospital's Id identifier.
     */
    public void setHospitalId(String hospitalId) {
        this.hospitalId = hospitalId;
    }
}
