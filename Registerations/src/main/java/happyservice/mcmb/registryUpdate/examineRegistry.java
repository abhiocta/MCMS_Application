package happyservice.mcmb.registryUpdate;

/**
 * Class representing an update Status for a registration record.
 */
public class examineRegistry {

    private String _id;
    private String status;

    /**
     * Get the ID of the registration record.
     *
     * @return The ID of the registration record.
     */
    public String get_id() {
        return _id;
    }

    /**
     * Set the ID of the registration record.
     *
     * @param _id The ID of the registration record.
     */
    public void set_id(String _id) {
        this._id = _id;
    }

    /**
     * Get the new status for the registration record.
     *
     * @return The new status for the registration record.
     */
    public String getStatus() {
        return status;
    }

    /**
     * Set the new status for the registration record.
     *
     * @param status The new status for the registration record.
     */
    public void setStatus(String status) {
        this.status = status;
    }

    /**
     * Create a new instance of the `examineRegistry` class.
     *
     * @param _id    The ID of the registration record.
     * @param status The new status for the registration record.
     */
    public examineRegistry(String _id, String status) {
        super();
        this._id = _id;
        this.status = status;
    }

    /**
     * Create a new instance of the `examineRegistry` class.
     */
    public examineRegistry() {
        super();
    }
}
