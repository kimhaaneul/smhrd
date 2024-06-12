package com.smhrd.eduwords.eduwords.repository;

import com.smhrd.eduwords.eduwords.entity.tb_member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MemRepository extends JpaRepository<tb_member, String> {
    List<tb_member> findByMemType(String memType);
}
