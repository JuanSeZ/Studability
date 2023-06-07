package persistence;

import entities.Event;
import entities.Task;

import javax.persistence.EntityManager;
import java.util.List;

public class Tasks {
    private final EntityManager entityManager;

    public Tasks(EntityManager entityManager) {this.entityManager = entityManager;}

    public Task addTask(Task task) {
        entityManager.persist(task);
        return task;
    }

    public Task deleteToDoTask(long id) {
        Task task = entityManager.find(Task.class, id);
        entityManager.remove(task);
        return task;
    }

    public Task changeTaskName(long id, String newName) {
        Task task = entityManager.find(Task.class, id);
        task.changeName(newName);
        entityManager.merge(task);
        return task;
    }

    public boolean exists(long taskId) {
        return entityManager.createQuery("SELECT t FROM Task t WHERE t.id = :id", Task.class)
                .setParameter("id", taskId).getResultList().size() > 0;
    }

    public List<Task> findByUserId(String userId) {
        return entityManager.createQuery("SELECT t FROM Task t WHERE t.userId LIKE :userId", Task.class)
                .setParameter("userId", userId).getResultList();
    }
}
