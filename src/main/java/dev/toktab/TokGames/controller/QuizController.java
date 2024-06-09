package dev.toktab.TokGames.controller;

import dev.toktab.TokGames.model.Quiz;
import dev.toktab.TokGames.service.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class QuizController {

    @Autowired
    private QuizService quizService;

    @GetMapping("/quizzes")
    public ResponseEntity<List<Quiz>> getAllQuizzes() {
        return new ResponseEntity<>(quizService.getAllQuizzes(), HttpStatus.OK);
    }

    @GetMapping("/quizzes/{id}")
    public ResponseEntity<Quiz> getQuizById(@PathVariable int id) {
        Optional<Quiz> quizOptional = quizService.getQuizById(id);
        return quizOptional.map(quiz -> new ResponseEntity<>(quiz, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping("/quizzes")
    public ResponseEntity<Quiz> saveQuiz(@RequestBody Quiz quiz) {
        return new ResponseEntity<>(quizService.saveQuiz(quiz), HttpStatus.CREATED);
    }

    @PutMapping("/quizzes/{id}")
    public ResponseEntity<Quiz> updateQuiz(@PathVariable int id, @RequestBody Quiz updatedQuiz) {
        Optional<Quiz> existingQuizOptional = quizService.getQuizById(id);
        if (!existingQuizOptional.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        Quiz existingQuiz = existingQuizOptional.get();
        existingQuiz.setTitle(updatedQuiz.getTitle());
        existingQuiz.setDescription(updatedQuiz.getDescription());
        existingQuiz.setPhoto(updatedQuiz.getPhoto());
        existingQuiz.setCreatorId(updatedQuiz.getCreatorId());
        existingQuiz.setActive(updatedQuiz.isActive());

        return new ResponseEntity<>(quizService.saveQuiz(existingQuiz), HttpStatus.OK);
    }

    @DeleteMapping("/quizzes/{id}")
    public ResponseEntity<Void> deleteQuiz(@PathVariable int id) {
        quizService.deleteQuiz(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}