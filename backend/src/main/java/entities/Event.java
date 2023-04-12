package entities;

import javax.persistence.*;

@Entity
@Table(name = "EVENT")
public class Event {

@Id
@GeneratedValue(generator = "userGen", strategy = GenerationType.SEQUENCE)
private long id;

// FORMAT: DD/MM/YYYY ---- Date when the event happens

@Column
private String userId;

@Column
private String date;

@Column
private String title;


    public Event(String date, String title, String userId) {
        this.date = date;
        this.title = title;
        this.userId = userId;
    }

    public Event() {

    }
    public static Event create(String date, String title, String userId){
        return new Event(date, title, userId);
    }

    public String getDate() {
        return date;
    }

    public String getTitle() {
        return title;
    }

    public String getUserId() {
        return userId;
    }

    public long getId() {
        return id;
    }
}