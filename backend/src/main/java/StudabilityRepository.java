import persistence.Events;
import persistence.Tasks;
import persistence.Users;

import javax.persistence.EntityManager;

public class StudabilityRepository {

        private final Users users;
        private final Events events;
        private final Tasks tasks;

        public StudabilityRepository(EntityManager entityManager) {
            this.users = new Users(entityManager);
            this.events = new Events(entityManager);
            this.tasks = new Tasks(entityManager);
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

        public Tasks tasks(){return tasks;}
    }

