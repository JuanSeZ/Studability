package chat;

public class ChatDTO {

    String senderId;
    String receiverId;

    String message;

    String groupId;

    public ChatDTO() {

    }

    public ChatDTO(String senderId, String receiverId, String message, String groupId) {
        this.senderId = senderId;
        this.receiverId = receiverId;
        this.message = message;
        this.groupId = groupId;
    }

    public String getSenderId() {
        return senderId;
    }

    public String getReceiverId() {
        return receiverId;
    }

    public String getMessage() {
        return message;
    }

    public String getGroupId() {
        return groupId;
    }
}
