package chat;

public class CreateGroupChatObject {
    private String id;
    private String[] usersId;

    public CreateGroupChatObject() {
    }

    public CreateGroupChatObject(String id, String[] usersId) {
        this.id = id;
        this.usersId = usersId;
    }

    public String getId() {
        return id;
    }

    public String[] getUsersId() {
        return usersId;
    }
}
