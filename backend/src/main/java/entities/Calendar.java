package entities;

import entitiesItems.CalendarEvent;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import java.util.ArrayList;

@Entity
public class Calendar {

    @Id
    private Long id;

    @OneToOne
    private Student student;

    private ArrayList<CalendarEvent> events;

    public Calendar(){
        this.id = student.getId(); // the calendar ID will be the same as the student ID
        this.events = new ArrayList<>();
    }

    public Long getId() {
        return id;
    }

}
