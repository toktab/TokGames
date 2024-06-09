package dev.toktab.TokGames.model;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.sql.Timestamp;

@Data
@Entity
public class Quiz {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(unique = true, nullable = false)
    private String title;
    private String description;
    private String photo;
    private int questionAmount;

    private int creatorId = 0;

    private boolean isActive = true;

    @Column(nullable = false, updatable = false)
    @CreationTimestamp
    private Timestamp createdOn;

    @Column(nullable = false)
    @UpdateTimestamp
    private Timestamp updatedOn;
}