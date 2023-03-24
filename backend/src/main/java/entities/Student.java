package entities;

import javax.persistence.*;

@Entity
public class Student {

    @Column()
    private String name;

    @Column()
    private String surname;

    @Column(nullable = false, unique = true)
    private String mail;

    @Column()
    private String password;

    @Column()
    private String career;

    @Id
    @GeneratedValue(generator = "userGen", strategy = GenerationType.SEQUENCE)
    private Long id;

    public Student(String name, String surname, String mail, String password, String career) {
        this.name = name;
        this.surname = surname;
        this.mail = mail;
        this.password = password;
        this.career = career;
    }

    public Student() {

    }

    public String getName() {
        return name;
    }

    public String getSurname() {
        return surname;
    }

    public String getMail() {
        return mail;
    }

    public String getPassword() {
        return password;
    }

    public String getCareer() {
        return career;
    }

    public Long getId(){return id;}
}
