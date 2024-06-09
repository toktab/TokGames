package dev.toktab.TokGames.model;

import dev.toktab.TokGames.model.enums.Difficulty;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.sql.Timestamp;

@Data
@Entity
public class Question {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false, unique = true)
    private String title;
    private String photo;
    @Column(nullable = false)
    private int quizId;

    @Column(nullable = false)
    private Difficulty difficulty;

    @Column(nullable = false)
    private String correct;
    private String incorrect;

    @Column(nullable = false, updatable = false)
    @CreationTimestamp
    private Timestamp createdOn;

    @Column(nullable = false)
    @UpdateTimestamp
    private Timestamp updatedOn;
}