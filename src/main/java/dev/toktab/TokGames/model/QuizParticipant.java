package dev.toktab.TokGames.model;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.sql.Timestamp;

@Data
@Entity
public class QuizParticipant {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private int score;

    @Column(nullable = false)
    private Long quiz_id;

    @Column(nullable = false)
    private Long user_id;

    @Column(nullable = false, updatable = false)
    @CreationTimestamp
    private Timestamp createdOn;

    @Column(nullable = false)
    @UpdateTimestamp
    private Timestamp updatedOn;
}