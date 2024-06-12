package com.smhrd.eduwords.eduwords.controller;

import com.smhrd.eduwords.eduwords.entity.tb_voca;
import com.smhrd.eduwords.eduwords.repository.VocaRepository;
import com.smhrd.eduwords.eduwords.service.VocaService;
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
public class VocaController {
    @Autowired
    private VocaService vocaService;
    @Autowired
    private VocaRepository vocaRepository;
    @PostMapping("/words")
    public ResponseEntity<List<tb_voca>> getWordsByMemId(@RequestBody Map<String, String> request) {
        String memId = request.get("mem_id");
        List<tb_voca> words = vocaService.getWordsByMemId(memId);
        return ResponseEntity.ok(words);
    }
    @PostMapping("/deleteWord")
    public ResponseEntity<String> deleteWord(@RequestBody Long voca_seq) {
        try {
            vocaRepository.deleteById(voca_seq);
            return ResponseEntity.ok("단어 삭제가 성공적으로 처리되었습니다.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("단어 삭제 중 오류가 발생했습니다.");
        }
    }

    @PostMapping("/addWord")
    public ResponseEntity<String> addWord(@RequestBody tb_voca word) {
        try {
            vocaRepository.save(word); // 받은 데이터를 DB에 저장합니다.
            return ResponseEntity.ok("단어가 성공적으로 추가되었습니다.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("단어 추가 중 오류가 발생했습니다.");
        }
    }

}
