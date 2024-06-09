package dev.toktab.TokGames.model;

import dev.toktab.TokGames.model.enums.Type;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.sql.Timestamp;

@Data
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
    private int score;
    private Long record;
    private boolean isActive = true;

    @Column(nullable = false, updatable = false)
    @CreationTimestamp
    private Timestamp createdOn;

    @Column(nullable = false)
    @UpdateTimestamp
    private Timestamp updatedOn;

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
