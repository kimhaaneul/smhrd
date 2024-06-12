package com.smhrd.eduwords.eduwords.service;

import com.smhrd.eduwords.eduwords.entity.tb_workbook;
import com.smhrd.eduwords.eduwords.repository.TestRepository;
import com.smhrd.eduwords.eduwords.repository.WorkRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class WorkbookService {

    @Autowired
    private WorkRepository workRepository;
    @Autowired
    private TestRepository testRepository;

    public boolean deleteExamByWorkSeq(Long workSeq) {
        try {
            if (testRepository == null) {
                throw new IllegalStateException("TestRepository is not properly injected");
            }
            testRepository.deleteByWorkSeq(workSeq); // tb_test에서 삭제
            workRepository.deleteById(workSeq); // tb_workbook에서 삭제
            return true;
        } catch (Exception e) {
            e.printStackTrace(); // 에러 로그 출력
            return false;
        }
    }

    public tb_workbook saveWorkbook(tb_workbook workbook) {
        return workRepository.save(workbook);
    }
}
