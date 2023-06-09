package persistence;

import entities.Event;
import model.CreateEventForm;

import javax.persistence.EntityManager;
import java.util.List;

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

    public Event deleteEvent(long id) {
        Event event = entityManager.find(Event.class, id);
        entityManager.remove(event);
        return event;
    }

    public Event modifyEvent(Long eventId, CreateEventForm eventForm){
        Event event = entityManager.find(Event.class, eventId);
        event.modifyEventsName(eventForm.title);
        event.modifyEventsDescription(eventForm.description);
        event.modifyEventsDate(eventForm.dateValue);
        entityManager.merge(event);
        return event;
    }

    public boolean exists(long eventId) {
        return entityManager.createQuery("SELECT e FROM Event e WHERE e.id = :id", Event.class)
                .setParameter("id", eventId).getResultList().size() > 0;
    }
}
