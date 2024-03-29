package model.ui;

import entities.User;

import java.util.Optional;

public class UserDTO {

    private String name;

    private String surname;

    private String email;

    private String career;

    private String password;


    public static UserDTO fromModel(User user) {
        UserDTO userDTO = new UserDTO();

        userDTO.career = user.getCareer();
        userDTO.email = user.getEmail();
        userDTO.surname = user.getSurname();
        userDTO.name = user.getName();
        userDTO.password = user.getPassword();

        return userDTO;
    }

    public String getEmail() {
        return email;
    }

    public String getName() {
        return name;
    }

    public String getSurname() {
        return surname;
    }
}
