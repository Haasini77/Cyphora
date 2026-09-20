package com.cybercase.cybercase;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "suspects")
public class Suspect {

    @Id
    private Integer id;

    private Integer caseId;
    private String name;
    private String role;
    private String device;
    private String ipAddress;
    private String lastSeen;
    private String statement;

    public Suspect() {
    }

    public Suspect(
            Integer id,
            Integer caseId,
            String name,
            String role,
            String device,
            String ipAddress,
            String lastSeen,
            String statement) {

        this.id = id;
        this.caseId = caseId;
        this.name = name;
        this.role = role;
        this.device = device;
        this.ipAddress = ipAddress;
        this.lastSeen = lastSeen;
        this.statement = statement;
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

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getDevice() {
        return device;
    }

    public void setDevice(String device) {
        this.device = device;
    }

    public String getIpAddress() {
        return ipAddress;
    }

    public void setIpAddress(String ipAddress) {
        this.ipAddress = ipAddress;
    }

    public String getLastSeen() {
        return lastSeen;
    }

    public void setLastSeen(String lastSeen) {
        this.lastSeen = lastSeen;
    }

    public String getStatement() {
        return statement;
    }

    public void setStatement(String statement) {
        this.statement = statement;
    }
}