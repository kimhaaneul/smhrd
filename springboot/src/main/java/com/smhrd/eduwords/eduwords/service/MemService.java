package com.smhrd.eduwords.eduwords.service;

import com.smhrd.eduwords.eduwords.entity.tb_member;
import com.smhrd.eduwords.eduwords.entity.tb_question;
import com.smhrd.eduwords.eduwords.repository.MemRepository;
import com.smhrd.eduwords.eduwords.repository.QesRepository;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MemService {
    @Autowired
    private MemRepository memRepository;
    public void saveMember(tb_member member) {
        memRepository.save(member);
    }

    public List<tb_member> memlist() {
        return memRepository.findAll();
    }

    public boolean deleteUserById(String mem_id, String mem_pw) {
        tb_member user = memRepository.findById(mem_id).orElse(null);

        if (user != null && user.getMem_pw().equals(mem_pw)) {
            memRepository.delete(user);
            return true;
        }
        return false;
    }
}

