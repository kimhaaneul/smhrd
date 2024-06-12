package com.smhrd.eduwords.eduwords.controller;

import com.smhrd.eduwords.eduwords.entity.tb_question;
import com.smhrd.eduwords.eduwords.repository.QesRepository;
import com.smhrd.eduwords.eduwords.service.QesService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class QesController {

    private final QesService qesService;
    private final QesRepository qesRepository;

    @PostMapping("/addQes")
    public ResponseEntity<String> addQes(@RequestBody tb_question tb_question) {
        try {
            qesService.save(tb_question);
            return ResponseEntity.status(HttpStatus.OK).body("문제가 성공적으로 저장되었습니다.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("문제 저장 중 오류가 발생했습니다.");
        }
    }

    @PostMapping("/questions")
    public List<tb_question> getQuestions(@RequestBody FilterCriteria criteria) {
        return qesService.getQuestionsByFilter(criteria.getFilter());
    }

    @PostMapping("/delete")
    public void deleteQuestion(@RequestBody Map<String, Long> request) {
        Long qes_seq = request.get("qes_seq");
        System.out.println("Received request to delete question with qes_seq: " + qes_seq);
        if (qes_seq != null) {
            qesRepository.deleteById(qes_seq);
            System.out.println("Deleted question with qes_seq: " + qes_seq);
        } else {
            System.out.println("qes_seq is null");
        }
    }
}

class FilterCriteria {
    private String filter;

    // Getters and setters
    public String getFilter() {
        return filter;
    }

    public void setFilter(String filter) {
        this.filter = filter;
    }
}
