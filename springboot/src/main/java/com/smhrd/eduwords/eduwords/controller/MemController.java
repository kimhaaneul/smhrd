
package com.smhrd.eduwords.eduwords.controller;

import com.smhrd.eduwords.eduwords.entity.tb_member;
import com.smhrd.eduwords.eduwords.repository.MemRepository;
import com.smhrd.eduwords.eduwords.service.MemService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class MemController {
    @Autowired
    private MemService Service;
    @Autowired
    private final MemRepository memRepository;

    @PostMapping("/deleteById")
    public Map<String, Object> deleteUser(@RequestBody Map<String, String> request) {
        String mem_id = request.get("mem_id");
        String mem_pw = request.get("mem_pw");

        boolean success = Service.deleteUserById(mem_id, mem_pw);

        Map<String, Object> response = new HashMap<>();
        response.put("success", success);
        return response;
    }
    @PostMapping("/check")
    public Map<String, Boolean> checkDuplicate(@RequestBody Map<String, String> request) {
        String username = request.get("mem_id");
        boolean exists = memRepository.existsById(username);
        System.out.println(username);
        return Map.of("exists", exists);
    }

    @PostMapping("/register")
    public String registerUser(@RequestBody tb_member member) {
        Service.saveMember(member);
        return "회원 가입이 완료되었습니다.";
    }

    @PostMapping("/studentsByType")
    public List<StudentInfo> getStudentsByType(@RequestBody String memType) {
        List<tb_member> members = memRepository.findByMemType("0"); // memType이 "0"인 회원 조회
        return members.stream()
                .map(member -> new StudentInfo(member.getMem_id(), member.getMem_name()))
                .collect(Collectors.toList());
    }


    private static class StudentInfo {
        private final String mem_id;
        private final String mem_name;

        public StudentInfo(String mem_id, String mem_name) {
            this.mem_id = mem_id;
            this.mem_name = mem_name;
        }

        public String getMem_id() {
            return mem_id;
        }

        public String getMem_name() {
            return mem_name;
        }
    }
    @PostMapping("/login")
    public Map<String, Object> login(@RequestBody Map<String, String> request) {
        String mem_id = request.get("mem_id");
        String mem_pw = request.get("mem_pw");

        Optional<tb_member> optionalMember = memRepository.findById(mem_id);
        Optional<tb_member> memberInfo = memRepository.findById(mem_id);

        Map<String, Object> response = new HashMap<>();
        if (optionalMember.isPresent() && optionalMember.get().getMem_pw().equals(mem_pw)) {
            response.put("success", true);
            response.put("message", "로그인 성공");
            response.put("mem_name", optionalMember.get().getMem_name());
            response.put("mem_address", optionalMember.get().getMem_address());
            response.put("mem_email", optionalMember.get().getMem_email());
            response.put("mem_number", optionalMember.get().getMem_number());
            response.put("mem_id", optionalMember.get().getMem_id());
            response.put("memType", optionalMember.get().getMemType());
            // 필요한 경우 추가 데이터를 포함할 수 있습니다.
        } else {
            response.put("success", false);
            response.put("message", "로그인 실패");
        }
        return response;



    }
}