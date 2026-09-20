package com.cybercase.cybercase;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class InvestigatorController {

    private final InvestigatorRepository investigatorRepository;

    public InvestigatorController(
            InvestigatorRepository investigatorRepository) {

        this.investigatorRepository =
                investigatorRepository;
    }


    // ========================================
    // REGISTER
    // ========================================

    @PostMapping("/register")
    public String register(
            @RequestBody Investigator investigator) {

        if (investigatorRepository
                .findByEmail(investigator.getEmail())
                .isPresent()) {

            return "Email already registered";
        }

        // Generate a simple Integer ID
        Integer newId =
                (int) investigatorRepository.count() + 1;

        investigator.setId(newId);

        investigatorRepository.save(investigator);

        return "Registration successful";
    }


    // ========================================
    // LOGIN
    // ========================================

    @PostMapping("/login")
    public String login(
            @RequestBody Investigator investigator) {

        return investigatorRepository
                .findByEmail(investigator.getEmail())
                .map(existingInvestigator -> {

                    if (existingInvestigator
                            .getPassword()
                            .equals(investigator.getPassword())) {

                        return "Login successful";
                    }

                    return "Invalid password";

                })
                .orElse("Email not registered");
    }
}