package entities;


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

    @OneToMany(fetch = FetchType.EAGER)
    private List<Friendship> friendships = new ArrayList<>();


    public List<User> getFriends() {
        return friendships.stream().map(Friendship::getFriend2).toList();
    }

    public void addFriend(User friend) {
        addFriendship(this, friend, friendships);

        addFriendship(friend, this, friend.friendships);
    }

    private void addFriendship(User friend1, User friend, List<Friendship> friendships) {
        final Friendship friendship = new Friendship();
        friendship.setFriend1(friend1);
        friendship.setFriend2(friend);

        friendships.add(friendship);
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
    public static User create(String name, String surname, String email, String password, String career, Set<User> friendsRequests, List<User> mutualFriends){
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

    private boolean equals(User user1, User user2){
        return (Objects.equals(user1.getEmail(), user2.getEmail()));
    }

    public void removeFriendRequest(User friend){
        User[] friendRequests = friendsRequests.toArray(new User[friendsRequests.size()]);
        for (User friendRequest : friendRequests) {
            if (friend.equals(friend, friendRequest)) {
                friendsRequests.remove(friendRequest);
            }
        }
    }
}
