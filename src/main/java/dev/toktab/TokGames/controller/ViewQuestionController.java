package dev.toktab.TokGames.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/question")
public class ViewQuestionController {
    @GetMapping("/{id}")
    public String viewQuestionPage(@PathVariable int id){
        return "question";
    }
}
