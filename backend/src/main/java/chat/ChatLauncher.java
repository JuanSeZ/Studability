package chat;
import com.corundumstudio.socketio.AckRequest;
import com.corundumstudio.socketio.Configuration;
import com.corundumstudio.socketio.SocketIOClient;
import com.corundumstudio.socketio.SocketIOServer;
import com.corundumstudio.socketio.listener.ConnectListener;
import com.corundumstudio.socketio.listener.DataListener;
import com.corundumstudio.socketio.listener.DisconnectListener;

public class ChatLauncher {

    public static void main(String[] args) throws InterruptedException {
        initSocketIO();
    }


    public static void initSocketIO()  {
        Configuration config = new Configuration();
        config.setHostname("localhost");
        config.setPort(8080);


        final SocketIOServer server = new SocketIOServer(config);

        server.addConnectListener(new ConnectListener() {

            @Override
            public void onConnect(SocketIOClient client) {
                // TODO verify the user
            }

        });

        server.addDisconnectListener(new DisconnectListener() {

            @Override
            public void onDisconnect(SocketIOClient client) {
                // TODO Auto-generated method stub
                System.out.println("a connection has been abolished: " + client.getSessionId());
            }

        });


        server.addEventListener("joinRoom", ChatObject.class, new DataListener<ChatObject>() {
            @Override
            public void onData(SocketIOClient client, ChatObject data, AckRequest ackRequest) {
                // TODO change the data in order to have the room id and the user id
                //  and eventually load the conversation from the database

                client.joinRoom(data.getReceiverId());

                // Load Conversation
                // send the conversation to the client
                // Verify if they are friends (?)

                server.getBroadcastOperations().sendEvent("loadConversation", data);

            }

        });

        server.addEventListener("chatevent", ChatObject.class, new DataListener<ChatObject>() {
            @Override
            public void onData(SocketIOClient client, ChatObject data, AckRequest ackRequest) {

                // Save the message in the database
                // Send the message to the receiver

                server.getBroadcastOperations().sendEvent("chatevent", data);
            }

        });

        server.start();
    }
}


