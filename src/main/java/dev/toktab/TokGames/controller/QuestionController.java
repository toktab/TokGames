package dev.toktab.TokGames.controller;

import dev.toktab.TokGames.model.Question;
import dev.toktab.TokGames.service.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class QuestionController {

    @Autowired
    private QuestionService questionService;

    @GetMapping("/questions")
    public ResponseEntity<List<Question>> getAllQuestions() {
        return new ResponseEntity<>(questionService.getAllQuestions(), HttpStatus.OK);
    }

    @GetMapping("/questions/{id}")
    public ResponseEntity<Question> getQuestionById(@PathVariable int id) {
        Optional<Question> questionOptional = questionService.getQuestionById(id);
        return questionOptional.map(question -> new ResponseEntity<>(question, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
    @GetMapping("/questions/{quizId}/questions")
    public ResponseEntity<List<Question>> getQuestionsByQuizId(@PathVariable int quizId) {
        List<Question> questions = questionService.getQuestionsByQuizId(quizId);
        return new ResponseEntity<>(questions, HttpStatus.OK);
    }


    @PostMapping("/questions")
    public ResponseEntity<Question> saveQuestion(@RequestBody Question question) {
        return new ResponseEntity<>(questionService.saveQuestion(question), HttpStatus.CREATED);
    }

    @PutMapping("/questions/{id}")
    public ResponseEntity<Question> updateQuestion(@PathVariable int id, @RequestBody Question updatedQuestion) {
        Optional<Question> existingQuestionOptional = questionService.getQuestionById(id);
        if (!existingQuestionOptional.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        Question existingQuestion = existingQuestionOptional.get();
        existingQuestion.setTitle(updatedQuestion.getTitle());
        existingQuestion.setPhoto(updatedQuestion.getPhoto());
        existingQuestion.setQuizId(updatedQuestion.getQuizId());
        existingQuestion.setDifficulty(updatedQuestion.getDifficulty());
        existingQuestion.setCorrect(updatedQuestion.getCorrect());
        existingQuestion.setIncorrect(updatedQuestion.getIncorrect());

        return new ResponseEntity<>(questionService.saveQuestion(existingQuestion), HttpStatus.OK);
    }

    @DeleteMapping("/questions/{id}")
    public ResponseEntity<Void> deleteQuestion(@PathVariable int id) {
        questionService.deleteQuestion(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}