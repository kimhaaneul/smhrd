package com.smhrd.eduwords.eduwords.service;

import com.smhrd.eduwords.eduwords.entity.tb_test;
import com.smhrd.eduwords.eduwords.repository.TestRepository;
import org.aspectj.weaver.ast.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TestService {

    @Autowired
    private TestRepository testRepository;

    public List<tb_test> getExamsByMemId(String memId) {
        return testRepository.findByMemId(memId);
    }

    public tb_test getTestById(Long testId) {
        return testRepository.findById(testId).orElse(null);
    }

    public void saveTest(tb_test test) {
        testRepository.save(test);
    }


}
