package com.smhrd.eduwords.eduwords.service;

import com.smhrd.eduwords.eduwords.entity.tb_member;
import com.smhrd.eduwords.eduwords.entity.tb_voca;
import com.smhrd.eduwords.eduwords.repository.VocaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@Service
public class VocaService {

    @Autowired
    private VocaRepository vocaRepository;

    public List<tb_voca> getWordsByMemId(String mem_id) {
        return vocaRepository.findByMemId(mem_id);
    }

}
