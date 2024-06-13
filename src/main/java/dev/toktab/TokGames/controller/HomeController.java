package dev.toktab.TokGames.controller;

import dev.toktab.TokGames.config.UserInfoDetails;
import dev.toktab.TokGames.model.Quiz;
import dev.toktab.TokGames.service.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@Controller
public class HomeController {
    private final QuizService quizService;

    @Autowired
    public HomeController(QuizService quizService) {
        this.quizService = quizService;
    }

    @GetMapping("/")
    public String gotoHome(){
        return "redirect:/home";
    }
    @GetMapping("/minesweeper")
    public String minesweeper() {
        return "redirect:/minesweeper/index.html";
    }
    @GetMapping("/snakegame")
    public String snake() {
        return "redirect:/snake/index.html";
    }
    @GetMapping("/new-quiz")
    public String newQuiz() {
        return "redirect:/new-quiz.html";
    }
    @GetMapping("/quizzes")
    public String quiz() {
        return "redirect:/quizzes.html";
    }
    @GetMapping("/profile")
    public String profile() {
        return "redirect:profile.html";
    }

    @GetMapping("/settings")
    public String settings() {
        return "redirect:settings.html";
    }

    @GetMapping("/privacy")
    public String privacy() {
        return "redirect:privacy.html";
    }

    @GetMapping("/scoreboard")
    public String scoreboard() {
        return "redirect:/scoreboard.html";
    }

    @GetMapping("/about")
    public String aboutUs() {
        return "redirect:/about_us.html";
    }
    @PostMapping("/new-quiz")
    public ResponseEntity<Quiz> createQuiz(@RequestBody Quiz quiz) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserInfoDetails userInfoDetails = (UserInfoDetails) authentication.getPrincipal();

        int userId = userInfoDetails.getUser().getId();
        quiz.setCreatorId(userId);

        return new ResponseEntity<>(quizService.saveQuiz(quiz), HttpStatus.CREATED);
    }
}