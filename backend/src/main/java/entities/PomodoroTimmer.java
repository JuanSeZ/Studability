package entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToOne;

@Entity
public class PomodoroTimmer{

    @Id
    private Long id;

    @Column
    @OneToOne
    private User user;

    public PomodoroTimmer(){
        this.id = user.getId(); //the pomodorotimmer id will be the same as the student id
    }

    public Long getId() {
        return id;
    }

    public User getUser() {
        return user;
    }
}
