package dev.toktab.TokGames.controller;

import dev.toktab.TokGames.model.User;
import dev.toktab.TokGames.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/register")
public class RegisterUserController {

    private final UserService userService;

    @Autowired
    public RegisterUserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping
    public ResponseEntity<String> registerUser(@RequestBody User user) {
        try {
            // Perform validation and business logic here, if needed
            userService.createUser(user);
            return new ResponseEntity<>("User registered successfully", HttpStatus.CREATED);
        } catch (Exception e) {
            // Handle exceptions, e.g., user already exists, validation errors
            return new ResponseEntity<>("Failed to register user: " + e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
}
