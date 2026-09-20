package com.cybercase.cybercase;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface InvestigatorRepository
        extends MongoRepository<Investigator, Integer> {

    Optional<Investigator> findByEmail(String email);

}