package dev.toktab.TokGames.controller;

import dev.toktab.TokGames.model.QuizParticipant;
import dev.toktab.TokGames.service.QuizParticipantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RequestMapping("/api")
@RestController
public class QuizParticipantController {

    @Autowired
    private QuizParticipantService quizParticipantService;

    @GetMapping("/quiz-participants")
    public ResponseEntity<List<QuizParticipant>> getAllQuizParticipants() {
        return new ResponseEntity<>(quizParticipantService.getAllQuizParticipants(), HttpStatus.OK);
    }

    @GetMapping("/quiz-participants/{id}")
    public ResponseEntity<QuizParticipant> getQuizParticipantById(@PathVariable int id) {
        Optional<QuizParticipant> quizParticipantOptional = quizParticipantService.getQuizParticipantById(id);
        return quizParticipantOptional.map(quizParticipant -> new ResponseEntity<>(quizParticipant, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping("/quiz-participants")
    public ResponseEntity<QuizParticipant> saveQuizParticipant(@RequestBody QuizParticipant quizParticipant) {
        return new ResponseEntity<>(quizParticipantService.saveQuizParticipant(quizParticipant), HttpStatus.CREATED);
    }

    @PutMapping("/quiz-participants/{id}")
    public ResponseEntity<QuizParticipant> updateQuizParticipant(@PathVariable int id, @RequestBody QuizParticipant updatedQuizParticipant) {
        Optional<QuizParticipant> existingQuizParticipantOptional = quizParticipantService.getQuizParticipantById(id);
        if (!existingQuizParticipantOptional.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        QuizParticipant existingQuizParticipant = existingQuizParticipantOptional.get();
        existingQuizParticipant.setScore(updatedQuizParticipant.getScore());
        existingQuizParticipant.setQuiz_id(updatedQuizParticipant.getQuiz_id());
        existingQuizParticipant.setUser_id(updatedQuizParticipant.getUser_id());

        return new ResponseEntity<>(quizParticipantService.saveQuizParticipant(existingQuizParticipant), HttpStatus.OK);
    }

    @DeleteMapping("/quiz-participants/{id}")
    public ResponseEntity<Void> deleteQuizParticipant(@PathVariable int id) {
        quizParticipantService.deleteQuizParticipant(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}