package persistence;

import entities.Event;
import entities.User;
import model.CreateEventForm;
import model.RegistrationUserForm;

import javax.persistence.EntityManager;
import java.util.*;

public class Users {
    private final EntityManager entityManager;

    public Users(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    public User createUser(RegistrationUserForm signUpValues) {
        final User newUser = User.create(signUpValues.getName().toLowerCase(), signUpValues.getSurname().toLowerCase(),
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

    public List<User> listByName(String name, User me) {
        String sqlQuery = "SELECT u.* FROM User u " +
                "WHERE u.name LIKE :name " +
                "AND u.name <> :meName " +
                "AND NOT EXISTS (" +
                "   SELECT * FROM FRIENDSHIP f WHERE f.User_email = :meEmail " +
                "   AND f.friends_email = u.email" +
                ")";

        List<User> users = entityManager.createNativeQuery(sqlQuery, User.class)
                .setParameter("name", "%" + name + "%")
                .setParameter("meName", me.getName())
                .setParameter("meEmail", me.getEmail())
                .getResultList();

        List<User> requestsSent = entityManager.createQuery("SELECT u FROM User u JOIN u.friendsRequests r WHERE r.email = :meEmail", User.class)
                .setParameter("meEmail", me.getEmail())
                .getResultList();


        users.removeAll(requestsSent);
        return users;


    }

    public List<User> listSentRequests(User requester) {
        String sqlQuery = "SELECT u.* FROM User u " +
                "JOIN USER_USER uu ON uu.USER_EMAIL = u.email " +
                "WHERE uu.FRIENDSREQUESTS_EMAIL = :requesterEmail";

        return entityManager.createNativeQuery(sqlQuery, User.class)
                .setParameter("requesterEmail", requester.getEmail())
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

    public void acceptRequest(User user, User user2) {
        user.addFriend(user2);
        user.removeFriendRequest(user2);
        entityManager.merge(user);
        user2.addFriend(user);
        user2.removeFriendRequest(user);
        entityManager.merge(user2);
    }

    public User editProfile(String email, RegistrationUserForm registrationUserForm) {
        User user = entityManager.find(User.class, email);
        user.modifyName(registrationUserForm.getName());
        user.modifySurname(registrationUserForm.getSurname());
        user.modifyEmail(registrationUserForm.getEmail());
        user.modifyPassword(registrationUserForm.getPassword());
        user.modifyCareer(registrationUserForm.getCareer());
        entityManager.merge(user);
        return user;
    }
}

