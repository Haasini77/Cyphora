package com.cybercase.cybercase;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface EvidenceRepository extends MongoRepository<Evidence, Integer> {

    List<Evidence> findByCaseId(Integer caseId);

}