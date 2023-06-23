package chat;

import org.hibernate.annotations.Entity;

import javax.persistence.Column;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.Date;


@Entity
@Table(name = "CHAT")
public class ChatObject {


        @Id
        private String id;

        @Column()
        private String senderId;
        @Column()
        private String receiverId;
        @Column()
        private Date date;
        @Column()
        private String message;




        public ChatObject() {
        }

        public ChatObject(String senderId, String receiverId, Date date, String message) {
                this.senderId = senderId;
                this.receiverId = receiverId;
                this.date = date;
                this.message = message;
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
