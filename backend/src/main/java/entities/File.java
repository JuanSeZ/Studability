package entities;

import javax.persistence.*;

@Entity
public class File {

    @Id
    private Long id;

    @Column
    private String ownerName;

    @ManyToOne
    private Student student;


    public File(Long id, String ownerName) {
        this.id = id;
        this.ownerName = student.getName();
    }

    public File() {

    }

    public Long getId() {
        return id;
    }

    public String getOwnerName() {
        return ownerName;
    }

}
