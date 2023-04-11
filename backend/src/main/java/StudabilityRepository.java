import persistence.Events;
import persistence.Users;

import javax.persistence.EntityManager;
import java.util.Calendar;

public class StudabilityRepository {

        private final Users users;

        private final Events events;

        public StudabilityRepository(EntityManager entityManager) {
            this.users = new Users(entityManager);
            this.events = new Events(entityManager);
        }

        public static StudabilityRepository create(EntityManager entityManager) {
            return new StudabilityRepository(entityManager);
        }

        public Users users() {
            return users;
        }

        public Events events() {
            return events;
        }
    }

