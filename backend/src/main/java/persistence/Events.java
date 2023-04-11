package persistence;

import entities.Event;

import javax.persistence.EntityManager;
import java.util.List;
import java.util.Optional;

public class Events {
private final EntityManager entityManager;

    public Events(EntityManager entityManager) {
        this.entityManager = entityManager;
    }


    public List<Event> findByUserId(String userId) {
        return entityManager.createQuery("SELECT e FROM Event e WHERE e.userId LIKE :userId", Event.class)
                .setParameter("userId", userId).getResultList();
    }

    public List<Event> list() {
        return entityManager.createQuery("SELECT e FROM Event e", Event.class)
                .getResultList();
    }

    public Event addEvent(Event event) {
        entityManager.persist(event);
        return event;
    }

    public Event deleteEvent(Event event) {
       entityManager.createQuery("DELETE FROM Event e WHERE e.date = :date AND e.title = :title AND e.userId = :userId")
               .setParameter("date", event.getDate())
               .setParameter("title", event.getTitle())
               .setParameter("userId", event.getUserId())
               .executeUpdate();
       return event;
    }

    public boolean exists(Event event) {
        return entityManager.createQuery("SELECT e FROM Event e WHERE e.date = :date AND e.title = :title AND e.userId = :userId", Event.class)
                .setParameter("date", event.getDate())
                .setParameter("title", event.getTitle())
                .setParameter("userId", event.getUserId())
                .getResultList().size() > 0;
    }
}
