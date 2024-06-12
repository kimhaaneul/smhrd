package com.smhrd.eduwords.eduwords.repository;

import com.smhrd.eduwords.eduwords.entity.tb_workbook;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WorkRepository extends JpaRepository<tb_workbook, Long> {
}
