package com.smhrd.eduwords.eduwords.repository;

import com.smhrd.eduwords.eduwords.entity.tb_voca;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VocaRepository extends JpaRepository<tb_voca, Long> {
    List<tb_voca> findByMemId(String memId);
}
