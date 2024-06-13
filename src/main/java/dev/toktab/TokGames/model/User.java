package dev.toktab.TokGames.model;

import dev.toktab.TokGames.model.enums.Type;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.sql.Timestamp;

@Data
@NoArgsConstructor
@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String name;
    private String lastName;
    private String mail;

    @Column(unique = true,nullable = false)
    private String username;

    @Column(nullable = false)
    private String password;

    private String photo;
    private Type type = Type.USER;
    private Integer score; // changed from int to Integer
    private boolean isActive = true;

    @Column(nullable = false, updatable = false)
    @CreationTimestamp
    private Timestamp createdOn;

    @Column(nullable = false)
    @UpdateTimestamp
    private Timestamp updatedOn;

    public User(String name, String lastName, String mail, String username, String password, String photo, Type type, Integer score) {
        this.name = name;
        this.lastName = lastName;
        this.mail = mail;
        this.username = username;
        this.password = password;
        this.photo = photo;
        this.type = type;
        this.score = score;
        this.createdOn = new Timestamp(System.currentTimeMillis());
        this.updatedOn = new Timestamp(System.currentTimeMillis());
    }


    // Getters and setters for the new fields
    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getMail() {
        return mail;
    }

    public void setMail(String mail) {
        this.mail = mail;
    }
}
