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
    private Student student;

    public PomodoroTimmer(){
        this.id = student.getId(); //the pomodorotimmer id will be the same as the student id
    }

    public Long getId() {
        return id;
    }

    public Student getStudent() {
        return student;
    }
}
