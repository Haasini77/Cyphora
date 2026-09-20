package com.cybercase.cybercase;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface SuspectRepository
        extends MongoRepository<Suspect, Integer> {

    List<Suspect> findByCaseId(Integer caseId);

}