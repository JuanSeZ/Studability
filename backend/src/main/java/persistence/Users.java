package persistence;

import entities.User;
import model.RegistrationUserForm;

import javax.persistence.EntityManager;
import java.util.List;
import java.util.Optional;

public class Users {
        private final EntityManager entityManager;

        public Users(EntityManager entityManager) {
            this.entityManager = entityManager;
        }

        public User createUser(RegistrationUserForm signUpValues) {
            final User newUser = User.create(signUpValues.getName(),signUpValues.getSurname(),
                    signUpValues.getEmail(),signUpValues.getPassword(),signUpValues.getCareer());

            if (exists(newUser.getEmail())) throw new IllegalStateException("User already exists.");

            entityManager.persist(newUser);

            return newUser;
        }

        public boolean exists(String email) {
            return findByEmail(email).isPresent();
        }

        public Optional<User> findByEmail(String email) {
            return entityManager.createQuery("SELECT u FROM User u WHERE u.email LIKE :email", User.class)
                    .setParameter("email", email).getResultList().stream()
                    .findFirst();
        }

        public List<User> list() {
            return entityManager.createQuery("SELECT u FROM User u", User.class)
                    .getResultList();
        }
    }

