package entities;


import javax.persistence.*;

@Entity
@Table(name = "ToDoList")

public class Task {

    @Column()
    private String name;

    @Column()
    private String userID;

    @Id
    @GeneratedValue(generator = "userGen", strategy = GenerationType.SEQUENCE)
    private long id;

    public Task(String name, String userID){
        this.name = name;
        this.userID = userID;
    }

    public Task() {}

    public static Task create(String name, String userID){
        return new Task(name, userID);
    }

    public String getName(){
        return name;
    }

    public String getUserID() {
        return userID;
    }

    public long getId() {
        return id;
    }
}
