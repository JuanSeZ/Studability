package entities;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToOne;

@Entity
public class Calendar {

    @Id
    private Long id;

    @OneToOne
    private User user;

//    private ArrayList<CalendarEvent> events;

    public Calendar(){
//        this.id = user.getId(); // the calendar ID will be the same as the student ID
//        this.events = new ArrayList<>();
    }

    public Long getId() {
        return id;
    }

}
