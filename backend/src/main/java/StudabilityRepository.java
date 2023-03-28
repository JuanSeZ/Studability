import persistence.Users;

import javax.persistence.EntityManager;

    public class StudabilityRepository {

        private final Users users;

        public StudabilityRepository(EntityManager entityManager) {
            this.users = new Users(entityManager);
        }

        public static StudabilityRepository create(EntityManager entityManager) {
            return new StudabilityRepository(entityManager);
        }

        public Users users() {
            return users;
        }

    }

