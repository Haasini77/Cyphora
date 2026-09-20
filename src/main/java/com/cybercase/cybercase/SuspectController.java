package com.cybercase.cybercase;

import java.util.List;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SuspectController {

    private final SuspectRepository suspectRepository;

    public SuspectController(
            SuspectRepository suspectRepository) {

        this.suspectRepository = suspectRepository;
    }


    // ========================================
    // GET ALL SUSPECTS
    // ========================================

    @GetMapping("/suspects")
    public List<Suspect> getAllSuspects() {

        return suspectRepository.findAll();

    }


    // ========================================
    // GET SUSPECT BY ID
    // ========================================

    @GetMapping("/suspects/{id}")
    public Suspect getSuspectById(
            @PathVariable Integer id) {

        return suspectRepository
                .findById(id)
                .orElse(null);

    }


    // ========================================
    // GET SUSPECTS FOR A SPECIFIC CASE
    // ========================================

    @GetMapping("/cases/{caseId}/suspects")
    public List<Suspect> getSuspectsByCase(
            @PathVariable Integer caseId) {

        return suspectRepository
                .findByCaseId(caseId);

    }


    // ========================================
    // SEED CASE-WISE SUSPECTS
    // ========================================

    @Bean
    CommandLineRunner seedSuspects() {

        return args -> {

            List<Suspect> existingSuspects =
                    suspectRepository.findAll();


            // Old suspects don't have caseId.
            // Remove them and create the new
            // case-wise suspects.

            boolean hasCaseWiseData =
                    existingSuspects.stream()
                            .anyMatch(
                                suspect ->
                                    suspect.getCaseId() != null
                            );


            if (!hasCaseWiseData) {

                suspectRepository.deleteAll();


                suspectRepository.saveAll(List.of(

                    // ====================================
                    // CASE 001 - ZERO TRACE
                    // ====================================

                    new Suspect(
                        1,
                        1,
                        "Arjun Rao",
                        "Lab Assistant",
                        "LAB-PC-03",
                        "192.168.1.14",
                        "01:50 AM",
                        "I left the computer lab before 2:00 AM."
                    ),

                    new Suspect(
                        2,
                        1,
                        "Meera Sharma",
                        "Student",
                        "LAB-PC-07",
                        "10.24.56.91",
                        "02:24 AM",
                        "I was studying in the library."
                    ),

                    new Suspect(
                        3,
                        1,
                        "Rahul Verma",
                        "Student",
                        "LAB-PC-02",
                        "192.168.1.27",
                        "02:05 AM",
                        "I was working on an assignment."
                    ),


                    // ====================================
                    // CASE 002 - THE VANISHED DEVICE
                    // ====================================

                    new Suspect(
                        4,
                        2,
                        "Karan Reddy",
                        "Student",
                        "HOSTEL-LAP-12",
                        "192.168.10.24",
                        "10:42 PM",
                        "I returned to my room after dinner."
                    ),

                    new Suspect(
                        5,
                        2,
                        "Ananya Das",
                        "Student",
                        "HOSTEL-LAP-08",
                        "192.168.10.31",
                        "11:18 PM",
                        "I was attending a video call in my room."
                    ),

                    new Suspect(
                        6,
                        2,
                        "Vikram Singh",
                        "Hostel Warden",
                        "WARDEN-PC-01",
                        "192.168.10.5",
                        "11:32 PM",
                        "I was checking the hostel corridor cameras."
                    ),


                    // ====================================
                    // CASE 003 - IDENTITY UNKNOWN
                    // ====================================

                    new Suspect(
                        7,
                        3,
                        "Nisha Kapoor",
                        "Research Scholar",
                        "LAB-SYS-04",
                        "172.16.2.41",
                        "09:12 PM",
                        "I was working on my research project."
                    ),

                    new Suspect(
                        8,
                        3,
                        "Aditya Rao",
                        "Student",
                        "LAB-SYS-09",
                        "172.16.2.58",
                        "09:35 PM",
                        "I logged out and left the lab."
                    ),

                    new Suspect(
                        9,
                        3,
                        "Priya Menon",
                        "System Administrator",
                        "ADMIN-PC-01",
                        "172.16.2.10",
                        "09:48 PM",
                        "I was monitoring the network dashboard."
                    )

                ));

                System.out.println(
                    "Cyphora: Case-wise suspects inserted into MongoDB."
                );

            }

        };

    }

}