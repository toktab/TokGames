package dev.toktab.TokGames.controller;

import dev.toktab.TokGames.model.User;
import dev.toktab.TokGames.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

import java.security.Principal;

@Controller
public class ViewUserController {
    @Autowired
    private UserDetailsService userDetailsService;

    private UserService userService;

    public ViewUserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/home")
    public String home(Model model, Principal principal) {
        UserDetails userDetails = userDetailsService.loadUserByUsername(principal.getName());
        model.addAttribute("userdetail", userDetails);
        return "home";
    }

    @GetMapping("/login")
    public String login(Model model, User newUser) {

        model.addAttribute("user", newUser);
        return "login";
    }

    @GetMapping("/register")
    public String register(Model model, User newUser) {
        model.addAttribute("user", newUser);
        return "register";
    }

    @PostMapping("/register")
    public String registerSava(@ModelAttribute("user") User newUser, Model model) {
        User user = userService.findByUsername(newUser.getUsername());
        if (user != null) {
            model.addAttribute("Userexist", user);
            return "register";
        }
        userService.save(newUser);
        return "redirect:/register?success";
    }
}
