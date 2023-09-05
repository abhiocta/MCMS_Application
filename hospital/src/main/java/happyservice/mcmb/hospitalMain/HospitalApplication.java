package happyservice.mcmb.hospitalMain;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.CrossOrigin;

/**
 * Main class to start the Hospital application.
 */
@SpringBootApplication
@CrossOrigin
public class HospitalApplication {

    /**
     * The entry point for the Hospital application.
     *
     * @param args Command-line arguments.
     */
    public static void main(String[] args) {
        SpringApplication.run(HospitalApplication.class, args);
    }

}
