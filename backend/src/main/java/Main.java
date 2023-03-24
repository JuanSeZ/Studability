import entities.Student;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.EntityTransaction;
import javax.persistence.Persistence;

public class Main {

    public static void main(String[] args) {

        final EntityManagerFactory factory = Persistence.createEntityManagerFactory("Studability");
        final EntityManager manager = factory.createEntityManager();
        sample(manager);


    }

    public static void sample(EntityManager manager) {

        EntityTransaction entityTransaction = manager.getTransaction();
        
        entityTransaction.begin();

        final Student student1 = new Student("francisco", "cavallaro", "hola", "boca", "gordotopo");
        final Student student2 = new Student("valentina", "valenzi", "chau", "boca", "gordotopo");
        final Student student3 = new Student("jota", "zanelli", "hola", "boca", "gordotopo");

        manager.persist(student1);
        manager.persist(student2);
        manager.persist(student3);

        entityTransaction.commit();

        manager.close();
    }
}
