import entities.Event;
import entities.User;
import entities.Task;
import model.CreateEventForm;
import model.CreateTaskForm;
import model.RegistrationUserForm;
import persistence.Events;
import persistence.Tasks;
import persistence.Users;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import java.util.List;
import java.util.Optional;
import java.util.function.Function;

import static json.JsonParser.fromJson;

// TODO: Crear un EventForm para no romper la inmutabilidad de Event
public class Studability {

    private final EntityManagerFactory factory;
    private Studability(EntityManagerFactory factory) {
        this.factory = factory;
    }

    public static Studability create(String persistenceUnitName) {
        final EntityManagerFactory factory = Persistence.createEntityManagerFactory(persistenceUnitName);
        return new Studability(factory);
    }

    public Optional<User> registerUser(RegistrationUserForm form) {
        return runInTransaction(datasource -> {
            final Users users = datasource.users();
            return users.exists(form.getEmail()) ? Optional.empty() : Optional.of(users.createUser(form));
        });
    }

    private <E> E runInTransaction(Function<StudabilityRepository, E> closure) {
        final EntityManager entityManager = factory.createEntityManager();
        final StudabilityRepository ds = StudabilityRepository.create(entityManager);

        try {
            entityManager.getTransaction().begin();
            final E result = closure.apply(ds);
            entityManager.getTransaction().commit();
            return result;
        } catch (Throwable e) {
            e.printStackTrace();
            entityManager.getTransaction().rollback();
            throw e;
        } finally {
            entityManager.close();
        }
    }

    public Optional<User> findUserByEmail(String email) {
        return runInTransaction(
                ds -> ds.users().findByEmail(email)
        );
    }

    public List<User> listUsers() {
        return runInTransaction(
                ds -> ds.users().list()
        );
    }

    public boolean validPassword(String password, User foundUser) {
        // Super dummy implementation. Zero security
        return foundUser.getPassword().equals(password);
    }

    public Optional<Event> addEvent(String body, User user) {
        return runInTransaction(datasource -> {
            Events events = datasource.events();
            final CreateEventForm createEventForm = fromJson(body, CreateEventForm.class);

            Event event = new Event(createEventForm.dateValue, createEventForm.title, user.getEmail());
            return Optional.of(events.addEvent(event));
        });
    }

    public List<Event> listEventsofUser(User user) {
        return runInTransaction(datasource -> {
            Events events = datasource.events();
            return events.findByUserId(user.getEmail());
        });
    }

    public Optional<Object> deleteEvent(Long eventId) {
        return runInTransaction(datasource -> {
            Events events = datasource.events();
            return events.exists(eventId) ? Optional.of(events.deleteEvent(eventId)) : Optional.empty();
        });
    }
    public Optional<Task> addToDoTask(String body, User user) {
        return runInTransaction(datasource -> {
            Tasks tasks = datasource.tasks();
            final CreateTaskForm createTaskForm = fromJson(body, CreateTaskForm.class);

            Task task = new Task(createTaskForm.name, user.getEmail());
            return Optional.of(tasks.addTask(task));
        });
    }

    public List<Task> listTaskOfUser(User user) {
        return runInTransaction(datasource -> {
            Tasks tasks = datasource.tasks();
            return tasks.findByUserId(user.getEmail());
        });
    }

    public Optional<Object> deleteToDoTask(Long taskId) {
        return runInTransaction(datasource -> {
            Tasks tasks = datasource.tasks();
            return tasks.exists(taskId) ? Optional.of(tasks.deleteToDoTask(taskId)) : Optional.empty();
        });
    }
}
