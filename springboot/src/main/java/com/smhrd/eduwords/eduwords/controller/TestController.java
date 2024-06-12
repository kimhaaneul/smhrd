package com.smhrd.eduwords.eduwords.controller;

import com.google.gson.Gson;
import com.smhrd.eduwords.eduwords.entity.tb_test;
import com.smhrd.eduwords.eduwords.repository.TestRepository;
import com.smhrd.eduwords.eduwords.repository.VocaRepository;
import com.smhrd.eduwords.eduwords.service.TestService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class TestController {

    private final TestService testService;
    private final TestRepository testRepository; // TestRepository 주입

    @PostMapping("/getTests")
    public List<tb_test> getTests(@RequestBody Map<String, String> request) {
        String memId = request.get("mem_id");
        return testRepository.findByMemId(memId);
    }

    @PostMapping("/getTestById")
    public ResponseEntity<tb_test> getTestById(@RequestBody Map<String, Long> request) {
        Long test_seq = request.get("testId");
        tb_test test = testService.getTestById(test_seq);
        return ResponseEntity.ok(test);
    }

    @PostMapping("/submitTest")
    public ResponseEntity<String> submitTest(@RequestBody Map<String, Object> request) {
        Long test_seq = Long.parseLong(request.get("test_seq").toString());
        Map<String, String> selectedAnswers = (Map<String, String>) request.get("selectedAnswers");

        // 현재 시간을 가져와서 yyyy-mm-dd 형식으로 변환
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
        Date currentDate = new Date();
        String formattedDate = formatter.format(currentDate);

        // test_seq를 이용하여 tb_test 레코드를 가져온다.
        tb_test test = testService.getTestById(test_seq);
        if (test == null) {
            return ResponseEntity.badRequest().body("시험 정보를 찾을 수 없습니다.");
        }

        // 선택한 답안들을 JSON 형태로 변환하여 answer 컬럼에 저장
        String jsonAnswers = new Gson().toJson(selectedAnswers);
        test.setAnswer(jsonAnswers);

        // 현재 시간을 submitted_at 필드에 저장
        test.setSubmitted_at(formattedDate);

        // 변경된 정보를 저장
        testService.saveTest(test);

        return ResponseEntity.ok("시험 답안이 성공적으로 제출되었습니다.");
    }

    @PostMapping("/getStudentsByWorkbookName")
    public ResponseEntity<List<tb_test>> getStudentsByWorkbookName(@RequestBody Map<String, Long> request) {
        Long workSeq = request.get("workSeq");
        List<tb_test> students = testRepository.findByWorkSeq(workSeq);
        return ResponseEntity.ok(students);
    }

//    @PostMapping("/getStudentsByWorkbookName")
//    public List<tb_test> getStudentsByWorkbookName(@RequestBody String workbookName) {
//        // 서비스에서 workbook 이름으로 학생을 가져오는 메서드가 있다고 가정합니다.
//        return testService.getStudentsByWorkbookName(workbookName);
//    }
}
