package entities;

import javax.persistence.*;

@Entity
@Table(name = "USER")
public class User {

    @Column()
    private String name;


    @Column()
    private String surname;

    @Column(nullable = false, unique = true)
    private String email;

    @Column()
    private String password;

    @Column()
    private String career;

    @Id
    @GeneratedValue(generator = "userGen", strategy = GenerationType.SEQUENCE)
    private Long id;

    public User(String name, String surname, String email, String password, String career) {
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.password = password;
        this.career = career;
    }

    public User() {

    }
    public static User create(String name, String surname, String email, String password, String career){
        return new User(name, surname, email, password, career);
    }

    public String getName() {
        return name;
    }

    public String getSurname() {
        return surname;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    public String getCareer() {
        return career;
    }
}
