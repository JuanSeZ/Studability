package persistence;

import entities.User;
import model.RegistrationUserForm;

import javax.persistence.EntityManager;
import java.util.*;

public class Users {
    private final EntityManager entityManager;

    public Users(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    public User createUser(RegistrationUserForm signUpValues) {
        final User newUser = User.create(signUpValues.getName(), signUpValues.getSurname(),
                signUpValues.getEmail(), signUpValues.getPassword(), signUpValues.getCareer(), new HashSet<>(), new ArrayList<>());

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

    public List<User> listByName(String name, String me){
        return entityManager.createQuery("SELECT u FROM User u WHERE u.name LIKE :name AND u.name <> :me", User.class)
                .setParameter("name", "%" + name + "%")
                .setParameter("me", me)
                .getResultList();
    }

    public User addRequestToList(User requester, User requested) {
        requested.getFriendsRequests().add(requester);
        entityManager.merge(requested);
        return requested;
    }

    public Set<User> rejectRequest(User user, User toBeRejected) {
        user.removeFriendRequest(toBeRejected);
        entityManager.merge(user);
        return user.getFriendsRequests();
    }

    public List<User> acceptRequest(String email) {
        return entityManager.createQuery("SELECT u FROM User u WHERE u.email LIKE :email", User.class)
                .setParameter("email", email)
                .getResultList();
    }

}

