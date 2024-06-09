package dev.toktab.TokGames.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/quiz")
public class ViewQuizController {
    @GetMapping("/{id}")
    public String viewQuizPage(@PathVariable int id) {
        return "quiz";
    }
}
