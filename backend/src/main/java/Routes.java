import com.google.common.cache.Cache;
import com.google.common.cache.CacheBuilder;
import entities.Event;
import entities.Task;
import entities.User;
import json.JsonParser;
import model.Auth;
import model.AuthRequest;
import model.RegistrationUserForm;
import model.RequestForm;
import model.ui.UserDTO;
import persistence.FilesRepository;
import spark.Request;
import spark.Response;
import spark.Route;

import javax.servlet.MultipartConfigElement;
import java.io.InputStream;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;

import static java.util.concurrent.TimeUnit.MINUTES;
import static json.JsonParser.fromJson;
import static json.JsonParser.toJson;
import static spark.Spark.*;

public class Routes {
    public static final String REGISTER_ROUTE = "/register";
    public static final String AUTH_ROUTE = "/auth";
    public static final String USERS_ROUTE = "/users";
    public static final String USER_ROUTE = "/user";
    public static final String CALENDAR_ROUTE = "/home/calendar";
    public static final String CALENDAR_DELETE_ROUTE = "/home/calendar/:id";

    private Studability system;

    public void create(Studability system) {
        this.system = system;
        routes();
    }

    private void routes() {

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

        authorizedGet("/listUser", (req, res) -> {
            String search = req.queryParams("search");
            final List<UserDTO> users;
            if (search == null) {
                users = system.listUsers().stream().map(UserDTO::fromModel).toList();
            } else {
                final User me = getUser(req).get();
//                users = system.listUserByName(search, me.getName()).stream().map(UserDTO::fromModel).toList();
                users = system.listUserByName(search, me).stream().map(UserDTO::fromModel).toList();
            }
            return JsonParser.toJson(users);
        });

        authorizedPost("/sendRequest", (req, res) -> {
            final User requester = getUser(req).get();
            final RequestForm requestForm = JsonParser.fromJson(req.body(), RequestForm.class);
            system.addFriendRequest(requester, requestForm).ifPresentOrElse(
                    (user) -> {
                        res.status(201);
                    },
                    () -> {res.status(404);}
            );
            return res.status();
        });

        authorizedGet("/requests", (req, res) -> {
            final User user = getUser(req).get();
            system.listFriendsRequestsFromUser(user).ifPresentOrElse(
                    (requests) -> {
                        res.status(200);
                        res.body(JsonParser.toJson(requests));
                    }, () -> {
                        res.status(404);
                    }
            );
            return res.body();
        });

        authorizedGet("/sentRequests", (req, res) -> {
            final User user = getUser(req).get();
            system.listSentRequests(user).ifPresentOrElse(
                    (sentRequests) -> {
                        res.status(200);
                        res.body(JsonParser.toJson(sentRequests));
                    }, () -> {
                        res.status(404);
                    }
            );
            return res.body();
        });


        authorizedPost("/acceptRequest", (req, res) -> {
            final User user = getUser(req).get();
            RequestForm requestForm = JsonParser.fromJson(req.body(), RequestForm.class);
            system.addFriend(user, requestForm.getEmailRequested()).ifPresentOrElse(
                    (requests) -> {
                        res.status(200);
                        res.body(JsonParser.toJson(requests));
                    },
                    () -> {
                        res.status(404);
                    }
            );
            return res.body();
        });

        authorizedDelete("/requests", (req, res) -> {
            final User user = getUser(req).get();
            final RequestForm requestForm = JsonParser.fromJson(req.body(), RequestForm.class);
            system.rejectRequest(user, requestForm);
            res.status(200);
            return user.getFriendsRequests();
        });

        authorizedGet("/friends", (req, res) -> {
            final User user = getUser(req).get();
            system.listFriendsFromUser(user).ifPresentOrElse(
                    (friends) -> {
                        res.status(200);
                        res.body(JsonParser.toJson(friends));
                    }, () -> {
                        res.status(404);
                    }
            );
            return res.body();
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
            final List<Event> events = system.listEventsOfUser(user);
            return JsonParser.toJson(events);
        });

        authorizedDelete(CALENDAR_DELETE_ROUTE, (req, res) -> {
            final Long eventId = Long.parseLong(req.params(":id"));
            system.deleteEvent(eventId).ifPresentOrElse(
                    (event) -> {
                        res.status(200);
                        res.body(JsonParser.toJson(event));
                    },
                    () -> {
                        res.status(409);
                        res.body("Could not delete event");
                    }
            );
            return res.body();
        });

        authorizedPost("/modifyEvent/:id", (req, res) -> {
            final Long eventId  = Long.parseLong(req.params(":id"));
            system.modifyEvent(eventId, req.body()).ifPresentOrElse(
                    event -> {
                        res.status(200);
                        res.body(JsonParser.toJson(event));
                    },
                    () -> {
                        res.status(409);
                        res.body("Could not modify event");
                    }
            );
            return res.body();
        });

        authorizedPost("/tasks", (req, res) -> {
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

        authorizedGet("/tasks", (req, res) -> {
            final User user = getUser(req).get();
            final List<Task> tasks = system.listTaskOfUser(user);
            return JsonParser.toJson(tasks);
        });

        authorizedDelete("/tasks/:id", (req, res) -> {
            final Long taskId = Long.parseLong(req.params(":id"));
            system.deleteToDoTask(taskId).ifPresentOrElse(
                    (task) -> {
                        res.status(200);
                        res.body("Task deleted");
                    },
                    () -> {
                        res.status(409);
                        res.body("Task does not exist");
                    }
            );
            return res.body();
        });

        authorizedPost("/changeTaskName/:id", (req, res) -> {
            final Long taskId = Long.parseLong(req.params(":id"));
            final String newName = req.body();
            system.changeTaskName(taskId, newName).ifPresent(
                    (task) -> {
                        res.status(200);
                        res.body("Task modified");
                    }
            );
            return res.body();
        });

        authorizedPost("/files/upload", (request, response) -> {

            request.attribute("org.eclipse.jetty.multipartConfig", new MultipartConfigElement("/temp"));
            InputStream input = request.raw().getPart("file").getInputStream();
            String fileName = request.raw().getPart("file").getSubmittedFileName();
            String userEmail = emailByToken.getIfPresent(getToken(request).get());
            try {
                system.uploadFile(fileName, userEmail, input);
                response.status(201);
                return "File uploaded";
            }
            catch (Exception e) {
                response.status(409);
                return "File already exists";
            }

        });

        get("file/:email/:name", (request, response) -> {
            String fileName = request.params(":name");
            String email = request.params(":email");
            String fileType = fileName.substring(fileName.indexOf('.') + 1);
            if(fileType.equals("pdf")) fileType = "application/"+ fileType;
            response.type(fileType);
            return FilesRepository.load(fileName,email);
        });

        authorizedGet("/files", (req, res) -> {
            final User user = getUser(req).get();
            final List<String[]> files = system.listFilesOfUser(user);
            return JsonParser.toJson(files);
        });
        authorizedGet("/files/friends", (req, res) -> {
            final User user = getUser(req).get();
            final List<String[]> files = system.listFilesOfFriends(user);
            return JsonParser.toJson(files);
        });

        authorizedGet("/home", (req, res) -> {
            final User user = getUser(req).get();
            res.status(200);
            res.body(JsonParser.toJson(UserDTO.fromModel(user)));
            return res.body();
        });

        authorizedGet(USER_ROUTE, (req, res) -> getToken(req).map(JsonParser::toJson));
        authorizedGet(USER_ROUTE, (req, res) -> getToken(req).map(JsonParser::toJson));
        authorizedGet("/listUser", (req, res) -> getToken(req).map(JsonParser::toJson));
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
