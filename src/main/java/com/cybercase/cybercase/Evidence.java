package com.cybercase.cybercase;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "evidence")
public class Evidence {

    @Id
    private Integer id;

    private Integer caseId;
    private String type;
    private String title;
    private String description;
    private String clue;

    public Evidence() {
    }

    public Evidence(
            Integer id,
            Integer caseId,
            String type,
            String title,
            String description,
            String clue) {

        this.id = id;
        this.caseId = caseId;
        this.type = type;
        this.title = title;
        this.description = description;
        this.clue = clue;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getCaseId() {
        return caseId;
    }

    public void setCaseId(Integer caseId) {
        this.caseId = caseId;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getClue() {
        return clue;
    }

    public void setClue(String clue) {
        this.clue = clue;
    }
}