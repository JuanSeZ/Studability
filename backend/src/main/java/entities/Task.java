package entities;


import javax.persistence.*;

@Entity
@Table(name = "ToDoList")

public class Task {

    @Column()
    private String name;

    @Column()
    private String userId;

    @Id
    @GeneratedValue(generator = "userGen", strategy = GenerationType.SEQUENCE)
    private long id;

    public Task(String name, String userId){
        this.name = name;
        this.userId = userId;
    }

    public Task() {}

    public static Task create(String name, String userId){
        return new Task(name, userId);
    }

    public String getName(){
        return name;
    }

    public void changeName(String newName) {
        this.name = newName;
    }

    public String getUserId() {
        return userId;
    }

    public long getId() {
        return id;
    }
}