package entities;

import javax.persistence.*;


@Entity
public class Friendship {

    @Id
    @GeneratedValue(generator = "friendshipGen", strategy = GenerationType.SEQUENCE)
    private int key;

    public void setFriend1(User friend1) {
        this.friend1 = friend1;
    }

    public void setFriend2(User friend2) {
        this.friend2 = friend2;
    }

    @ManyToOne
    private User friend1;

    @ManyToOne
    private User friend2;

    public User getFriend1() {
        return friend1;
    }

    public User getFriend2() {
        return friend2;
    }
}

