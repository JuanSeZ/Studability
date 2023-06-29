package persistence;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.List;


public class FilesRepository {

    private static final String storageFolder = "./resources/files/";

    public static void store(String filename,String emailUser, InputStream inputStream) throws IOException {
        File dir = new File(storageFolder + "/" + emailUser);
        if (!dir.exists()) {
            dir.mkdirs();
        }
        FileOutputStream outputStream = new FileOutputStream(storageFolder + "/" + emailUser + "/" + filename);
        byte[] buffer = new byte[1024];
        int bytesRead;
        while ((bytesRead = inputStream.read(buffer)) != -1) {
            outputStream.write(buffer, 0, bytesRead);}
        outputStream.close();
    }

    public static byte[] load(String name,String email) throws IOException {
        return Files.readAllBytes(Path.of(storageFolder + "/" + email + "/" + name));
    }

    public static void delete(String filename, String userEmail) throws IOException {
        Path filePath = filePath(userEmail, filename);
        Files.deleteIfExists(filePath);
    }
    private static Path filePath(String userEmail, String filename) {
        return Path.of(storageFolder, userEmail, filename);
    }

    private static Path filePath(String name) {
        return Path.of(storageFolder, name);
    }

    public static List<String[]> list(String[] usersEmails) {
        List<String[]> files = new ArrayList<>();
        for (String userEmail : usersEmails) {
            File dir = new File(storageFolder + "/" + userEmail);
            if (dir.exists()) {
                String[] userFiles = dir.list();
                assert userFiles != null;
                for (String file : userFiles) {
                    files.add(new String[]{userEmail, file});
                }
            }
        } {

        }
        return files;
    }

    public static FilesRepository create(){
        return new FilesRepository();
    }

}



