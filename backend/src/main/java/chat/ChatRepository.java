package chat;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import java.util.List;
import java.util.Optional;

public class ChatRepository {
    private final EntityManagerFactory factory;
    ChatRepository(EntityManagerFactory factory) {
        this.factory = factory;
    }

    public void createChat(ChatObject chat) {
        EntityManager em = factory.createEntityManager();

        try {
            em.getTransaction().begin();
            em.persist(chat);
            em.getTransaction().commit();
        } catch (Throwable e) {
            e.printStackTrace();
            em.getTransaction().rollback();
            throw e;
        } finally {
            em.close();
        }

    }


    public void createGroupChat(CreateGroupChatObject groupChat) {
        EntityManager em = factory.createEntityManager();

        try {
            em.getTransaction().begin();
            em.persist(groupChat);
            em.getTransaction().commit();
        } catch (Throwable e) {
            e.printStackTrace();
            em.getTransaction().rollback();
            throw e;
        } finally {
            em.close();
        }

    }

    public Optional<List<ChatObject>> findChat(String senderId, String receiverId) {
        EntityManager em = factory.createEntityManager();
        List<ChatObject> chat = em.createQuery("SELECT c FROM ChatObject c WHERE (c.senderId = :senderId AND c.receiverId = :receiverId) OR (c.senderId = :receiverId AND c.receiverId = :senderId) ORDER BY c.date ASC", ChatObject.class)
                .setParameter("senderId", senderId)
                .setParameter("receiverId", receiverId)
                .getResultList();
        em.close();
        return Optional.ofNullable(chat);
    }



    public Optional<List<ChatObject>> findChatByReceiverId(String receiverId) {
        EntityManager em = factory.createEntityManager();
        List<ChatObject> chat = em.createQuery("SELECT c FROM ChatObject c WHERE c.receiverId = :receiverId ORDER BY c.date ASC", ChatObject.class)
                .setParameter("receiverId", receiverId)
                .getResultList();
        em.close();
        return Optional.ofNullable(chat);
    }

//    Find group chat by userId

    public Optional<List<ChatObject>> findChatByGroupId(String groupId) {
        EntityManager em = factory.createEntityManager();
        List<ChatObject> chat = em.createQuery("SELECT c FROM ChatObject c WHERE c.groupId = :groupId ORDER BY c.date ASC", ChatObject.class)
                .setParameter("groupId", groupId)
                .getResultList();
        em.close();
        return Optional.ofNullable(chat);
    }
    public Optional<List<ChatObject>> findChatByUserId(String userId) {
        EntityManager em = factory.createEntityManager();
        List<ChatObject> chat = em.createQuery("SELECT c FROM ChatObject c WHERE c.senderId = :userId OR c.receiverId = :userId", ChatObject.class)
                .setParameter("userId", userId)
                .getResultList();
        em.close();
        return Optional.ofNullable(chat);
    }






}
