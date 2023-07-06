package chat;
import javax.persistence.*;
import java.util.Date;


@Entity
@Table(name = "CHAT")
public class ChatObject {


        @Id
        @GeneratedValue(strategy = GenerationType.SEQUENCE)
        private Long id;

        @Column()
        private String senderId;
        @Column()
        private String receiverId;
        @Column
        private Date date;
        @Column()
        private String message;

        @Column()
        private String groupId;




        public ChatObject() {
        }

        public ChatObject(String senderId, String receiverId, Date date, String message, String groupId) {
            this.senderId = senderId;
            this.receiverId = receiverId;
            this.date = date;
            this.message = message;
            this.groupId = groupId;
        }

    public Long getId() {
        return id;
    }

    public String getGroupId() {
        return groupId;
    }

    public String getSenderId() {
        return senderId;
    }

    public void setSenderId(String senderId) {
        this.senderId = senderId;
    }

    public String getReceiverId() {
        return receiverId;
    }

    public void setReceiverId(String receiverId) {
        this.receiverId = receiverId;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

}
