package happyservice.mcms.emp.main;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

/**
 * Main class to start the Employee Application.
 */
@SpringBootApplication
@EnableMongoRepositories
public class EmployeeApplication implements CommandLineRunner {
	
	/**
	 * Entry point of the application.
	 *
	 * @param args Command-line arguments
	 */
	public static void main(String[] args) {
		SpringApplication.run(EmployeeApplication.class, args);
	}

	/**
	 * Method called when the application starts.
	 *
	 * @param args Command-line arguments
	 * @throws Exception If an exception occurs during execution
	 */
	@Override
	public void run(String... args) throws Exception {
		// This method will be executed after the application starts
		// You can place initialization or setup code here
	}

}
