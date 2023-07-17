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

@Column
private String time;


    public Event(String date, String title, String userId, String description, String time) {
        this.date = date;
        this.title = title;
        this.userId = userId;
        this.description = description;
        this.time = time;
    }

    public Event() {

    }
    public static Event create(String date, String title, String userId, String description, String time){
        return new Event(date, title, userId, description, time);
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

    public String getTime(){return time;}

    public void modifyEventsName(String newEventsName){
        title = newEventsName;
    }
    public void modifyEventsDate(String newEventsDate){
        date = newEventsDate;
    }
    public void modifyEventsDescription(String newEventsDescription){
        description = newEventsDescription;
    }
    public void modifyEventsTime(String newEventsTime){
        time = newEventsTime;
    }
}