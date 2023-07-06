package chat;

import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import java.util.Date;
import java.util.List;
import java.util.Optional;

public class ChatService {

    private final ChatRepository repository;

    public ChatService(EntityManagerFactory factory) {
        this.repository = new ChatRepository(factory);
    }

    public List<ChatObject> getGroupChat(String groupId) {
        Optional<List<ChatObject>> chats = repository.findChatByGroupId(groupId);
        return chats.orElse(null);
    }

    public void createChat(String senderId, String receiverId, String message, String groupId) {
        ChatObject chat = new ChatObject(senderId, receiverId, new Date(), message, groupId);
        repository.createChat(chat);
    }

    public void createGroupChat(String id, String[] userId) {
        for (int i = 0; i < userId.length; i++) {
            GroupChatObject groupChat = new GroupChatObject(id, userId[i]);
            repository.createGroupChat(groupChat);
        }
    }

    //    List the conversations given a senderId
    public List<ChatObject> listConversations(String senderId) {
        Optional<List<ChatObject>> chats = repository.findChatByUserId(senderId);
        return chats.orElse(null);
    }

    public List<ChatObject> getConversation(String senderId, String receiverId) {
        Optional<List<ChatObject>> chats = repository.findChat(senderId, receiverId);
        return chats.orElse(null);
    }
}
