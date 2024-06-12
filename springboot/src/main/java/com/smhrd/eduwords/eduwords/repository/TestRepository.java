package com.smhrd.eduwords.eduwords.repository;

import com.smhrd.eduwords.eduwords.entity.tb_test;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TestRepository extends JpaRepository<tb_test, Long> {
    List<tb_test> findByMemId(String memId);
    tb_test save(tb_test test);
    List<tb_test> findByWorkSeq(Long workSeq);

    @Modifying
    @Transactional
    @Query("DELETE FROM tb_test t WHERE t.workSeq = :workSeq")
    void deleteByWorkSeq(@Param("workSeq") Long workSeq);
}

