package com.cybercase.cybercase;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface CaseRepository extends MongoRepository<Case, Integer> {

}