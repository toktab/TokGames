package dev.toktab.TokGames.service;

import dev.toktab.TokGames.model.QuizParticipant;
import dev.toktab.TokGames.repository.QuizParticipantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class QuizParticipantService {

    @Autowired
    private QuizParticipantRepository quizParticipantRepository;

    public List<QuizParticipant> getAllQuizParticipants() {
        return quizParticipantRepository.findAll();
    }

    public Optional<QuizParticipant> getQuizParticipantById(int id) {
        return quizParticipantRepository.findById(id);
    }

    public QuizParticipant saveQuizParticipant(QuizParticipant quizParticipant) {
        return quizParticipantRepository.save(quizParticipant);
    }

    public void deleteQuizParticipant(int id) {
        quizParticipantRepository.deleteById(id);
    }
}