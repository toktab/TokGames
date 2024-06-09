package dev.toktab.TokGames.repository;

import dev.toktab.TokGames.model.QuizParticipant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface QuizParticipantRepository extends JpaRepository<QuizParticipant, Integer> {
}