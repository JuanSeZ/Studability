package chat;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;



public class GroupChatObject {


    private String id;


    private String userId;

    public void setId(String id) {
        this.id = id;
    }

    public String getId() {
        return id;
    }

    public String getUserId() {
        return userId;
    }

    public GroupChatObject() {
    }

    public GroupChatObject(String id, String userId) {
        this.id = id;
        this.userId = userId;
    }
}
