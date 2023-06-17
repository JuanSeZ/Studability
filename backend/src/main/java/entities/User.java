package entities;

import net.bytebuddy.utility.nullability.MaybeNull;

import javax.annotation.Nullable;
import javax.persistence.*;
import java.util.*;

@Entity
@Table(name = "USER")
public class User {

    @Column()
    private String name;

    @Column()
    private String surname;

    @Id
    @Column(nullable = false, unique = true)
    private String email;

    @Column()
    private String password;

    @Column()
    private String career;

    @ManyToMany(fetch = FetchType.EAGER)
    private Set<User> friendsRequests = new HashSet<>(); // instead of a list, this eliminates duplicate values

    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinTable(name = "FRIENDSHIP")
    private List<User> friends = new ArrayList<>();

    public List<User> getFriends() {
        return friends;
    }

    public void addFriend(User friend) {
        friends.add(friend);
    }

    public User(String name, String surname, String email, String password, String career, Set<User> friendsRequests, List<User> mutualFriends) {
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.password = password;
        this.career = career;
        this.friendsRequests = friendsRequests;
    }

    public User() {

    }
    public static User create(String name, String surname, String email, String password, String career, Set<User> friendsRequests, List<User> mutualFriends) {
        return new User(name, surname, email, password, career, friendsRequests, mutualFriends);
    }

    public String getName() {
        return name;
    }

    public String getSurname() {
        return surname;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    public String getCareer() {
        return career;
    }

    public Set<User> getFriendsRequests() {
        return friendsRequests;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        User user = (User) o;
        return Objects.equals(email, user.email);
    }

    @Override
    public int hashCode() {
        return Objects.hash(email);
    }


    public void removeFriendRequest(User friend) {
        friendsRequests.remove(friend);
    }

    public void modifyName(String newName){
        this.name = newName;
    }

    public void modifySurname(String newSurname){
        this.surname = newSurname;
    }

    public void modifyCareer(String newCareer){
        this.career = newCareer;
    }

    public void modifyEmail(String newEmail){
        this.email = newEmail;
    }

    public void modifyPassword(String newPassword){
        this.password = newPassword;
    }
}
