package happyservice.mcms.emp.EO;

import java.util.Date;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import com.fasterxml.jackson.annotation.JsonFormat;

/**
 * This class represents an Employee Entity Object.
 */
@Document("employees")
public class EmployeeEO {
	
	@Id
	private String _id;
	
	private String fullName;
	
	private String dateOfBirth;
	private String mobileNo;
	private String gender;
	private String permanentAddress;
	private String pincode;
	private String occupation;
	private String panCard;
	private String username;
	private String password;
	

	/**
     * Gets the username of the employee.
     *
     * @return The username of the employee.
     */
	public String getUsername() {
		return username;
	}

	/**
     * Sets the username of the employee.
     *
     * @param username The username to set for the employee.
     */
	public void setUsername(String username) {
		this.username = username;
	}

	/**
     * Gets the password of the employee.
     *
     * @return The password of the employee.
     */
    public String getPassword() {
        return password;
    }

    /**
     * Sets the password of the employee.
     *
     * @param password The password to set for the employee.
     */
    public void setPassword(String password) {
        this.password = password;
    }
	
	/**
     * Constructs an EmployeeEO object with specified details.
     *
     * @param fullName        The full name of the employee.
     * @param dateofBirth     The date of birth of the employee.
     * @param mobileNo        The mobile number of the employee.
     * @param gender          The gender of the employee.
     * @param permanentAd     The permanent address of the employee.
     * @param pincode         The pincode of the employee's address.
     * @param occupation      The occupation of the employee.
     * @param panCard         The PAN card number of the employee.
     */
	public EmployeeEO(String fullName, String dateofBirth, String mobileNo, String gender, String permanentAd,
			String pincode, String occupation, String panCard) {
		super();
		this.fullName = fullName;
		this.dateOfBirth = dateofBirth;
		this.mobileNo = mobileNo;
		this.gender = gender;
		this.permanentAddress = permanentAd;
		this.pincode = pincode;
		this.occupation = occupation;
		this.panCard = panCard;
	}
	
	@Override
	public String toString() {
		return "EmployeeEO [_id=" + _id + ", fullName=" + fullName + ", dateOfBirth=" + dateOfBirth + ", mobileNo="
				+ mobileNo + ", gender=" + gender + ", PermanentAd=" + permanentAddress + ", pincode=" + pincode
				+ ", occupation=" + occupation + ", panCard=" + panCard + "]";
	}


	/**
     * Sets the full name of the employee.
     *
     * @param fullName The full name to set for the employee.
     */
	public void setFullName(String fullName) {
		this.fullName = fullName;
	}

	/**
     * Sets the date of birth of the employee.
     *
     * @param dateOfBirth The date of birth to set for the employee.
     */
	public void setDateofBirth(String dateofBirth) {
		this.dateOfBirth = dateofBirth;
	}

	/**
	 * Sets the mobile number of the employee.
	 *
	 * @param mobileNo The mobile number to set for the employee.
	 */
	public void setMobileNo(String mobileNo) {
	    this.mobileNo = mobileNo;
	}

	/**
	 * Sets the gender of the employee.
	 *
	 * @param gender The gender to set for the employee.
	 */
	public void setGender(String gender) {
	    this.gender = gender;
	}

	/**
	 * Sets the permanent address of the employee.
	 *
	 * @param permanentAd The permanent address to set for the employee.
	 */
	public void setPermanentAd(String permanentAd) {
	    permanentAddress = permanentAd;
	}

	/**
	 * Sets the pincode of the employee's address.
	 *
	 * @param pincode The pincode to set for the employee's address.
	 */
	public void setPincode(String pincode) {
	    this.pincode = pincode;
	}

	/**
	 * Sets the occupation of the employee.
	 *
	 * @param occupation The occupation to set for the employee.
	 */
	public void setOccupation(String occupation) {
	    this.occupation = occupation;
	}

	/**
	 * Sets the PAN card number of the employee.
	 *
	 * @param panCard The PAN card number to set for the employee.
	 */
	public void setPanCard(String panCard) {
	    this.panCard = panCard;
	}

	
	 /**
     * Default constructor for the EmployeeEO class.
     */
	public EmployeeEO() {
		super();
		// TODO Auto-generated constructor stub
	}

	/**
     * Gets the unique ID of the employee.
     *
     * @return The unique ID of the employee.
     */
	public String get_id() {
		return _id;
	}


	 /**
     * Gets the full name of the employee.
     *
     * @return The full name of the employee.
     */
	public String getFullName() {
		return fullName;
	}


	 /**
     * Gets the date of birth of the employee.
     *
     * @return The date of birth of the employee.
     */
	public String getDateofBirth() {
		return dateOfBirth;
	}


	/**
	 * Gets the mobile number of the employee.
	 *
	 * @return The mobile number of the employee.
	 */
	public String getMobileNo() {
	    return mobileNo;
	}

	/**
	 * Gets the gender of the employee.
	 *
	 * @return The gender of the employee.
	 */
	public String getGender() {
	    return gender;
	}

	/**
	 * Gets the permanent address of the employee.
	 *
	 * @return The permanent address of the employee.
	 */
	public String getPermanentAddress() {
	    return permanentAddress;
	}

	/**
	 * Gets the pincode of the employee's address.
	 *
	 * @return The pincode of the employee's address.
	 */
	public String getPincode() {
	    return pincode;
	}

	/**
	 * Gets the occupation of the employee.
	 *
	 * @return The occupation of the employee.
	 */
	public String getOccupation() {
	    return occupation;
	}

	/**
	 * Gets the PAN card number of the employee.
	 *
	 * @return The PAN card number of the employee.
	 */
	public String getPanCard() {
	    return panCard;
	}

}
