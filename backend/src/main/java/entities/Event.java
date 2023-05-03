package entities;

import org.checkerframework.checker.units.qual.C;

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

@Column
private String description;


    public Event(String date, String title, String userId, String description) {
        this.date = date;
        this.title = title;
        this.userId = userId;
        this.description = description;
    }

    public Event() {

    }
    public static Event create(String date, String title, String userId, String description){
        return new Event(date, title, userId, description);
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

    public String getDescription(){return description;}
}