package chat;
import com.corundumstudio.socketio.AckRequest;
import com.corundumstudio.socketio.Configuration;
import com.corundumstudio.socketio.SocketIOClient;
import com.corundumstudio.socketio.SocketIOServer;
import com.corundumstudio.socketio.listener.ConnectListener;
import com.corundumstudio.socketio.listener.DataListener;
import com.corundumstudio.socketio.listener.DisconnectListener;
import javax.persistence.EntityManagerFactory;


public class ChatLauncher {

    public static void initSocketIO(EntityManagerFactory factory) {
        Configuration config = new Configuration();
        config.setHostname("localhost");
        config.setPort(8080);

        final SocketIOServer server = new SocketIOServer(config);
        final ChatService chatService = new ChatService(factory);


        server.addConnectListener(new ConnectListener() {
            @Override
            public void onConnect(SocketIOClient client) {
                System.out.println("a conncection has been established");
            }
        });


        server.addDisconnectListener(new DisconnectListener() {

            @Override
            public void onDisconnect(SocketIOClient client) {
                // TODO Auto-generated method stub
                System.out.println("a connection has been abolished: " + client.getSessionId());
            }
        });

        server.addEventListener("joinRoom", GroupChatObject.class, new DataListener<GroupChatObject>() {
            @Override
            public void onData(SocketIOClient client, GroupChatObject data, AckRequest ackRequest) {
                client.joinRoom(data.getUserId());
                server.getRoomOperations(data.getUserId()).sendEvent("loadConversation", chatService.getConversation(data.getId(), data.getUserId()));
            }
        });

        server.addEventListener("joinGroupRoom", GroupChatObject.class, new DataListener<GroupChatObject>() {
            @Override
            public void onData(SocketIOClient client, GroupChatObject data, AckRequest ackRequest) {
                client.joinRoom(data.getId());
                server.getRoomOperations(data.getId()).sendEvent("loadConversation", chatService.getGroupChat(data.getId()));
            }

        });

        server.addEventListener("createGroupChat", GroupChatCreateDTO.class, new DataListener<GroupChatCreateDTO>() {
            @Override
            public void onData(SocketIOClient client, GroupChatCreateDTO data, AckRequest ackRequest) {
                client.joinRoom(data.getId());
                chatService.createGroupChat(data.getId(), data.getUsersId());
            }
        });



        server.addEventListener("message", ChatDTO.class, new DataListener<ChatDTO>() {
            @Override
            public void onData(SocketIOClient client, ChatDTO data, AckRequest ackRequest) {
                chatService.createChat(data.getSenderId(), data.getReceiverId(), data.getMessage(), data.getGroupId());
                server.getRoomOperations(data.getReceiverId()).sendEvent("loadConversation", chatService.getConversation(data.getSenderId(), data.getReceiverId()));
            }
        });

        server.addEventListener("groupMessage", ChatDTO.class, new DataListener<ChatDTO>() {
            @Override
            public void onData(SocketIOClient client, ChatDTO data, AckRequest ackRequest) {
                chatService.createChat(data.getSenderId(), data.getReceiverId(), data.getMessage(), data.getGroupId());
                server.getRoomOperations(data.getGroupId()).sendEvent("loadConversation", chatService.getGroupChat(data.getGroupId()));
            }
        });


        server.start();
    }
}


