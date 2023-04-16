import com.google.common.cache.Cache;
import com.google.common.cache.CacheBuilder;
import entities.Event;
import entities.User;
import json.JsonParser;
import model.Auth;
import model.AuthRequest;
import model.RegistrationUserForm;
import spark.Request;
import spark.Response;
import spark.Route;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static java.util.concurrent.TimeUnit.MINUTES;
import static json.JsonParser.toJson;
import static spark.Spark.*;

public class Routes {
    public static final String REGISTER_ROUTE = "/register";
    public static final String AUTH_ROUTE = "/auth";
    public static final String USERS_ROUTE = "/users";
    public static final String USER_ROUTE = "/user";
    public static final String CALENDAR_ROUTE = "/home/calendar";
    public static final String HOME_ROUTE = "/home";

    private Studability system;

    public void create(Studability system) {
        this.system = system;
        routes();
    }

    private void routes(){

        before((req, resp) -> {
            resp.header("Access-Control-Allow-Origin", "*");
            resp.header("Access-Control-Allow-Headers", "*");
            resp.header("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT, PATCH, OPTIONS");
        });

        options("/*", (req, resp) -> {
            resp.status(200);
            return "ok";
        });

        post(REGISTER_ROUTE, (req, res) -> {
            final RegistrationUserForm form = RegistrationUserForm.createFromJson(req.body());

            system.registerUser(form).ifPresentOrElse(
                    (user) -> {
                        res.status(201);
                        res.body("User created");
                    },
                    () -> {
                        res.status(409);
                        res.body("User already exists");
                    }
            );
            return res.body();
        });
        post(AUTH_ROUTE, (req, res) -> {
            final AuthRequest authReq = AuthRequest.createFromJson(req.body());

            authenticate(authReq)
                    .ifPresentOrElse(token -> {
                        res.status(201);
                        res.body(toJson(Auth.create(token)));
                    }, () -> {
                        res.status(401);
                        res.body("");
                    });

            return res.body();
        });

        authorizedDelete(AUTH_ROUTE, (req, res) -> {
            getToken(req)
                    .ifPresentOrElse(token -> {
                        emailByToken.invalidate(token);
                        res.status(200);
                    }, () -> {
                        res.status(404);
                    });

            return res.body();
        });

        authorizedGet(USERS_ROUTE, (req, res) -> {
            final List<User> users = system.listUsers();
            return JsonParser.toJson(users);
        });

        authorizedPost(CALENDAR_ROUTE, (req, res) -> {
            final String body = req.body();
            final User user = getUser(req).get();
            system.addEvent(body, user).ifPresentOrElse(
                    (event) -> {
                        res.status(201);
                        res.body(JsonParser.toJson(event));
                    },
                    () -> {
                        res.status(409);
                        res.body("Event already exists");
                    }
            );
            return res.body();
        });
        authorizedGet(CALENDAR_ROUTE, (req, res) -> {
            final User user = getUser(req).get();
            final List<Event> events = system.listEventsofUser(user);
            return JsonParser.toJson(events);
        });

        authorizedDelete(CALENDAR_ROUTE, (req, res) -> {
            final String body = req.body();
            final User user = getUser(req).get();
            system.deleteEvent(body, user).ifPresentOrElse(
                    (event) -> {
                        res.status(201);
                        res.body("Event deleted");
                    },
                    () -> {
                        res.status(409);
                        res.body("Event does not exist");
                    }
            );
            return res.body();
        });

        authorizedGet(USER_ROUTE, (req, res) -> getToken(req).map(JsonParser::toJson));
        authorizedGet(USER_ROUTE, (req, res) -> getToken(req).map(JsonParser::toJson));


        authorizedPost(HOME_ROUTE, (req, res) -> {
            final String body = req.body();
            final User user = getUser(req).get();
            system.addToDoTask(body, user).ifPresentOrElse(
                    (task) -> {
                        res.status(201);
                        res.body(JsonParser.toJson(task));
                    },
                    () -> {
                        res.status(409);
                        res.body("Task already exists");
                    }
            );
            return res.body();
        });

        authorizedDelete(HOME_ROUTE, (req, res) -> {
            final String body = req.body();
            final User user = getUser(req).get();
            system.deleteEvent(body, user).ifPresentOrElse(
                    (event) -> {
                        res.status(201);
                        res.body("Task deleted");
                    },
                    () -> {
                        res.status(409);
                        res.body("Task does not exist");
                    }
            );
            return res.body();
        });
    }
    private void authorizedGet(final String path, final Route route) {
        get(path, (request, response) -> authorize(route, request, response));
    }

    private void authorizedDelete(final String path, final Route route) {
        delete(path, (request, response) -> authorize(route, request, response));
    }

    private void authorizedPost(final String path, final Route route) {
        post(path, (request, response) -> authorize(route, request, response));
    }

    private Object authorize(Route route, Request request, Response response) throws Exception {
        if (isAuthorized(request)) {
            return route.handle(request, response);
        } else {
            response.status(401);
            return "Unauthorized";
        }
    }

    private Optional<User> getUser(Request req) {
        return getToken(req)
                .map(emailByToken::getIfPresent)
                .flatMap(email -> system.findUserByEmail(email));
    }

    private final Cache<String, String> emailByToken = CacheBuilder.newBuilder()
            .expireAfterAccess(30, MINUTES)
            .build();

    private Optional<String> authenticate(AuthRequest req) {
        return system.findUserByEmail(req.getEmail()).flatMap(foundUser -> {
            if (system.validPassword(req.getPassword(), foundUser)) {
                final String token = UUID.randomUUID().toString();
                emailByToken.put(token, foundUser.getEmail());
                return Optional.of(token);
            } else {
                return Optional.empty();
            }
        });
    }

    private boolean isAuthorized(Request request) {
        return getToken(request).map(this::isAuthenticated).orElse(false);
    }

    private static Optional<String> getToken(Request request) {
        return Optional.ofNullable(request.headers("Authorization"))
                .map(Routes::getTokenFromHeader);
    }

    private static String getTokenFromHeader(String authorizationHeader) {
        return authorizationHeader.replace("Bearer ", "");
    }

    private boolean isAuthenticated(String token) {
        return emailByToken.getIfPresent(token) != null;
    }
}
