package com.smhrd.eduwords.eduwords.service;

import com.smhrd.eduwords.eduwords.entity.tb_question;
import com.smhrd.eduwords.eduwords.repository.QesRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

@org.springframework.stereotype.Service
public class QesService {
    @Autowired
    private QesRepository qesRepository;

    public void save(tb_question tb_question) {
        qesRepository.save(tb_question);
    }

    public List<tb_question> getQuestionsByFilter(String filter) {
        return qesRepository.findAll();
    }

    public void deleteQuestion(Long id) {
        qesRepository.deleteById(id);
    }

}
