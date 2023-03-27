package model;

import static json.JsonParser.fromJson;

public class RegistrationUserForm {

    private final String name;
    private final String surname;
    private final String email;
    private final String password;
    private final String career;

    public RegistrationUserForm(String name, String surname, String email, String password, String career) {
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.password = password;
        this.career = career;
    }

    public static RegistrationUserForm createFromJson(String body) {
        return fromJson(body, RegistrationUserForm.class);
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
