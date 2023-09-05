package com.involveininnovation.chat.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

/**
 * Configuration class for WebSocket communication.
 */
@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    /**
     * Register STOMP endpoints for WebSocket communication.
     *
     * @param registry The STOMP endpoint registry.
     */
    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        // Register an endpoint for WebSocket communication
        registry.addEndpoint("/ws")
                .setAllowedOriginPatterns("*") // Allow connections from any origin
                .withSockJS(); // Enable SockJS support for fallback options
    }

    /**
     * Configure the message broker for WebSocket communication.
     *
     * @param registry The message broker registry.
     */
    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        // Set the application destination prefix for messages
        registry.setApplicationDestinationPrefixes("/app");

        // Enable a simple message broker with specific destinations
        registry.enableSimpleBroker("/chatroom", "/user");

        // Set the user destination prefix for messages
        registry.setUserDestinationPrefix("/user");
    }
    
    
}
