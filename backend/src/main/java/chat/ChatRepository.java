package chat;

import javax.persistence.EntityManagerFactory;

public class ChatRepository {
    private final EntityManagerFactory factory;
    private ChatRepository(EntityManagerFactory factory) {
        this.factory = factory;
    }

}
