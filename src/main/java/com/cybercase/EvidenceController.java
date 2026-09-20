package com.cybercase.cybercase;

import java.util.List;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping
public class EvidenceController {

    private final EvidenceRepository evidenceRepository;

    public EvidenceController(EvidenceRepository evidenceRepository) {
        this.evidenceRepository = evidenceRepository;
    }

    @GetMapping("/evidence")
    public List<Evidence> getAllEvidence() {

        return evidenceRepository.findAll();
    }

    @GetMapping("/evidence/{id}")
    public Evidence getEvidenceById(@PathVariable Integer id) {

        return evidenceRepository
                .findById(id)
                .orElse(null);
    }

    @GetMapping("/cases/{caseId}/evidence")
    public List<Evidence> getEvidenceByCase(
            @PathVariable Integer caseId) {

        return evidenceRepository.findByCaseId(caseId);
    }

    @Bean
    CommandLineRunner seedEvidence() {

        return args -> {

            if (evidenceRepository.count() == 0) {

                evidenceRepository.saveAll(List.of(

                    // ==============================
                    // CASE 001
                    // ==============================

                    new Evidence(
                        1,
                        1,
                        "login",
                        "Login Logs",
                        "02:14 AM unknown login attempt. 02:17 AM failed password attempt. 02:21 AM successful login. 02:24 AM admin account accessed.",
                        "A successful login occurred shortly after multiple failed password attempts."
                    ),

                    new Evidence(
                        2,
                        1,
                        "ip",
                        "IP Address Analysis",
                        "192.168.1.14 and 192.168.1.27 belong to the Computer Lab. 10.24.56.91 appears from an unknown network.",
                        "One IP address does not belong to the known Computer Lab network."
                    ),

                    new Evidence(
                        3,
                        1,
                        "device",
                        "Device Information",
                        "Windows Desktop using Google Chrome. Device ID: LAB-PC-07. Last active at 02:24 AM.",
                        "LAB-PC-07 was active at the exact time of the suspicious account access."
                    ),

                    new Evidence(
                        4,
                        1,
                        "files",
                        "File Access Logs",
                        "student_records.xlsx was opened, exam_data.pdf was downloaded and student_records.xlsx was copied.",
                        "Sensitive student data was accessed immediately after the suspicious login."
                    ),

                    // ==============================
                    // CASE 002
                    // ==============================

                    new Evidence(
                        5,
                        2,
                        "login",
                        "Hostel Access Activity",
                        "10:36 PM hostel entry recorded. 10:47 PM laptop connected to Wi-Fi. 11:03 PM laptop disconnected. 11:08 PM device location changed.",
                        "The missing laptop changed its network location shortly after disconnecting from the hostel Wi-Fi."
                    ),

                    new Evidence(
                        6,
                        2,
                        "ip",
                        "Network Trace",
                        "192.168.10.24 and 192.168.10.31 belong to Hostel Block A. 172.20.14.88 was detected near the parking area.",
                        "The missing device briefly appeared on a network associated with the hostel parking area."
                    ),

                    new Evidence(
                        7,
                        2,
                        "device",
                        "Missing Laptop",
                        "Device ID: HOSTEL-LAP-12. Model: Lenovo ThinkPad. Last Wi-Fi connection: 10:47 PM. Battery level: 68%.",
                        "HOSTEL-LAP-12 was the device reported missing and its last registered connection was at 10:47 PM."
                    ),

                    new Evidence(
                        8,
                        2,
                        "files",
                        "Laptop Activity",
                        "personal_files.zip was opened at 10:49 PM. device_backup.zip was created at 10:52 PM and transferred at 11:01 PM.",
                        "A backup archive was created and transferred shortly before the laptop disappeared."
                    ),

                    // ==============================
                    // CASE 003
                    // ==============================

                    new Evidence(
                        9,
                        3,
                        "login",
                        "Authentication Logs",
                        "09:06 PM password reset requested. 09:11 PM new session created. 09:16 PM security settings changed.",
                        "The account security settings were changed shortly after a password reset."
                    ),

                    new Evidence(
                        10,
                        3,
                        "ip",
                        "IP Investigation",
                        "172.16.2.41 and 172.16.2.58 belong to the Research Lab. External IP 45.83.21.17 accessed the account.",
                        "An external IP address accessed the account during the suspicious session."
                    ),

                    new Evidence(
                        11,
                        3,
                        "device",
                        "Session Device",
                        "Unknown Laptop using Firefox. Device ID: UNKNOWN-44. Suspicious session started at 09:11 PM.",
                        "The suspicious session originated from an unidentified device."
                    ),

                    new Evidence(
                        12,
                        3,
                        "files",
                        "Account Activity",
                        "Profile information was viewed, recovery email was changed and an account export was requested.",
                        "Multiple account settings were changed after the unidentified login."
                    )

                ));

                System.out.println(
                    "Cyphora: Evidence inserted into MongoDB."
                );
            }
        };
    }
}