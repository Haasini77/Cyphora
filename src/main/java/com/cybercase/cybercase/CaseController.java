package com.cybercase.cybercase;

import java.util.List;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CaseController {

    private final CaseRepository caseRepository;

    public CaseController(CaseRepository caseRepository) {
        this.caseRepository = caseRepository;
    }

    @GetMapping("/hello")
    public String hello() {

        return "Cyphora Backend is Running!";

    }

    @GetMapping("/cases")
    public List<Case> getCases() {

        return caseRepository.findAll();

    }

    @GetMapping("/cases/{id}")
    public Case getCaseById(@PathVariable Integer id) {

        return caseRepository.findById(id).orElse(null);

    }

    @PostMapping("/cases")
    public Case addCase(@RequestBody Case newCase) {

        return caseRepository.save(newCase);

    }

    @Bean
    CommandLineRunner seedCases() {

        return args -> {

            if (caseRepository.count() == 0) {

                caseRepository.saveAll(List.of(

                    new Case(
                        1,
                        "Case 001: Zero Trace",
                        "Computer Lab",
                        "OPEN"
                    ),

                    new Case(
                        2,
                        "Case 002: The Vanished Device",
                        "Hostel Block A",
                        "OPEN"
                    ),

                    new Case(
                        3,
                        "Case 003: Identity Unknown",
                        "Cyber Cafe",
                        "CLOSED"
                    )

                ));

            }

        };

    }
}