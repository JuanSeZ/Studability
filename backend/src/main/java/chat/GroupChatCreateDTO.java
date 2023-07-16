package chat;

public class GroupChatCreateDTO {

    private String id;
    private String[] usersId;

    public GroupChatCreateDTO() {}

    public GroupChatCreateDTO(String id, String[] usersId) {
        this.id = id;
        this.usersId = usersId;
    }


    public String[] getUsersId() {
        return usersId;
    }

    public String getId() {
        return id;
    }
}
