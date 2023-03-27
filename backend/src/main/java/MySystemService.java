import spark.Spark;

import static spark.Spark.port;
import static spark.Spark.staticFiles;

public class MySystemService {

    private final Routes routes = new Routes();

    public void start() {
        startWebServer();
    }

    public void stop() {
        stopWebServer();
    }

    private void startWebServer() {
        staticFiles.location("public");
        port(4321);
        final MySystem system = MySystem.create("Studability");
        routes.create(system);
    }

    private void stopWebServer() {
        Spark.stop();
    }
}