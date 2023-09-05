package com.involveininnovation.chat.model;

import lombok.*;

/**
 * Represents a message exchanged in a chat application.
 */
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class Message {

    /**
     * The name of the sender of the message.
     */
    private String senderName;

    /**
     * The name of the receiver of the message.
     */
    private String receiverName;

    /**
     * The content of the message.
     */
    private String message;

    /**
     * The date and time when the message was sent.
     */
    private String date;

    /**
     * The status of the message (e.g., delivered, read).
     */
    private Status status;

    /**
     * Get the sender's name.
     *
     * @return The sender's name.
     */
    public String getSenderName() {
        return senderName;
    }

    /**
     * Get the receiver's name.
     *
     * @return The receiver's name.
     */
    public String getReceiverName() {
        return receiverName;
    }

    /**
     * Get the message content.
     *
     * @return The message content.
     */
    public String getMessage() {
        return message;
    }

    /**
     * Get the date and time when the message was sent.
     *
     * @return The date and time in string format.
     */
    public String getDate() {
        return date;
    }

    /**
     * Get the status of the message.
     *
     * @return The status of the message.
     */
    public Status getStatus() {
        return status;
    }
}
