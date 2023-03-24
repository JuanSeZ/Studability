package entities;

import entitiesItems.ToDoListItem;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import java.util.ArrayList;

@Entity
public class ToDoList {

    @Id
    private Long id;

    @Column
    private ArrayList<ToDoListItem> toDoItems;

    @OneToOne
    private Student student;

    public ToDoList(){
        this.id = student.getId();
    }


}
