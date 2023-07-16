package chat;

import javax.persistence.*;

@Entity
@Table(name = "GroupChat")
public class CreateGroupChatObject {
    @Id
@GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;
    @Column()
    private String name;

    @Column()
    private String userId;

    public CreateGroupChatObject() {}

    public CreateGroupChatObject(String name, String userId) {
        this.name = name;
        this.userId = userId;
    }

    public String getName() {
        return name;
    }

    public String getUserId() {
        return userId;
    }

    public Long getId() {
        return id;
    }
}
