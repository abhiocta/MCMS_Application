package happyservice.mcmb.policyMain;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.CrossOrigin;

@SpringBootApplication
@CrossOrigin
public class PolicyTypeApplication {

	public static void main(String[] args) {
		SpringApplication.run(PolicyTypeApplication.class, args);
	}

}
