package com.cybercase.cybercase;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner initializeCases(CaseRepository caseRepository) {

        return args -> {

            if (caseRepository.count() == 0) {

                caseRepository.save(
                    new Case(
                        1,
                        "Case 001: Zero Trace",
                        "Computer Lab",
                        "OPEN"
                    )
                );

                caseRepository.save(
                    new Case(
                        2,
                        "Case 002: The Vanished Device",
                        "Hostel Block A",
                        "OPEN"
                    )
                );

                caseRepository.save(
                    new Case(
                        3,
                        "Case 003: Identity Unknown",
                        "Cyber Cafe",
                        "CLOSED"
                    )
                );

                System.out.println(
                    "Cyphora: Initial cases inserted into MongoDB."
                );
            }
        };
    }
}