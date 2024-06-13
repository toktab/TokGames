package dev.toktab.TokGames.model;

import dev.toktab.TokGames.model.enums.Type;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.sql.Timestamp;

@Data
@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String name;
    private String lastName;
    private String mail;

    @Column(unique = true, nullable = false)
    private String username;

    @Column(nullable = false)
    private String password;

    private String photo;
    private Type type = Type.USER;
    private int score = 0; // Default value is 0
    private Long record;
    private boolean isActive = true;

    @Column(nullable = false, updatable = false)
    @CreationTimestamp
    private Timestamp createdOn;

    @Column(nullable = false)
    @UpdateTimestamp
    private Timestamp updatedOn;

    public User() {} // Added no-arg constructor

    public User(String name, String lastName, String mail, String username, String password, String photo, Type type, int score, Long record, boolean active) {
        this.name = name;
        this.lastName = lastName;
        this.mail = mail;
        this.username = username;
        this.password = password;
        this.photo = photo;
        this.type = type;
        this.score = score;
        this.record = record;
        this.isActive = active;
    }
}