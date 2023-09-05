package com.involveininnovation.chat;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Main class to start the chat application.
 */
@SpringBootApplication
public class ChatApplication {

    /**
     * The entry point for the chat application.
     *
     * @param args Command-line arguments.
     */
    public static void main(String[] args) {
        SpringApplication.run(ChatApplication.class, args);
    }

}
