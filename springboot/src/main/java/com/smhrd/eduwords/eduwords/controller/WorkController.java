package com.smhrd.eduwords.eduwords.controller;

import com.smhrd.eduwords.eduwords.entity.tb_workbook;
import com.smhrd.eduwords.eduwords.entity.tb_test;
import com.smhrd.eduwords.eduwords.repository.WorkRepository;
import com.smhrd.eduwords.eduwords.repository.TestRepository;
import com.smhrd.eduwords.eduwords.service.TestService;
import com.smhrd.eduwords.eduwords.service.WorkbookService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class WorkController {
    @Autowired
    private final WorkRepository workRepository;
    private final TestRepository testRepository;
    private final TestService testService;
    private final WorkbookService workbookService;

    @PostMapping("/getExamsByMemId")
    public ResponseEntity<List<tb_test>> getExamsByMemId(@RequestBody Map<String, String> request) {
        String memId = request.get("mem_id");
        List<tb_test> exams = testService.getExamsByMemId(memId);
        return ResponseEntity.ok(exams);
    }

    @PostMapping("/saveWorkbook")
    public tb_workbook saveWorkbook(@RequestBody tb_workbook workbook) {
        return workRepository.save(workbook);
    }

    @PostMapping("/saveTest")
    public tb_test saveTest(@RequestBody tb_test test) {
        // 클라이언트에서 전송된 mem_id를 사용하여 설정
        // 클라이언트에서 mem_id를 전송하도록 수정 필요
        // 예시: test.setMem_id(request.getMem_id());
        return testRepository.save(test);
    }

    @PostMapping("/getAll")
    public List<tb_workbook> getAllExams() {
        return workRepository.findAll();
    }

    @PostMapping("/getById")
    public tb_workbook getExamById(@RequestBody Long id) {
        return workRepository.findById(id).orElse(null);
    }



    @PostMapping("/deleteExam")
    public Map<String, Object> deleteExam(@RequestBody Map<String, Long> request) {
        Long workSeq = request.get("workSeq");

        boolean success = workbookService.deleteExamByWorkSeq(workSeq);

        Map<String, Object> response = new HashMap<>();
        response.put("success", success);
        return response;
    }
}
