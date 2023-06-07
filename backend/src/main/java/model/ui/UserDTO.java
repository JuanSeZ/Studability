package model.ui;

import entities.User;

import java.util.Optional;

public class UserDTO {

    private String name;

    private String surname;

    private String email;

    private String career;


    public static UserDTO fromModel(User user) {
        UserDTO userDTO = new UserDTO();

        userDTO.career = user.getCareer();
        userDTO.email = user.getEmail();
        userDTO.surname = user.getSurname();
        userDTO.name = user.getName();

        return userDTO;
    }

//    public static UserDTO fromModel(Optional<User> userOptional) {
//        if(userOptional.isPresent()) {
//            User user = userOptional.get();
//            UserDTO userDTO = new UserDTO();
//            userDTO.career = user.getCareer();
//            userDTO.email = user.getEmail();
//            userDTO.surname = user.getSurname();
//            userDTO.name = user.getName();
//
//            return userDTO;
//        }
//        else{
//            return null;
//        }
//    }


}