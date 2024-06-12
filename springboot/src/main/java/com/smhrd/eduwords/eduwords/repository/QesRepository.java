package com.smhrd.eduwords.eduwords.repository;

import com.smhrd.eduwords.eduwords.entity.tb_question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
//
//@Repository
//@NoRepositoryBean
//public interface QesRepository extends JpaRepository<QesEntity, Long> {
//
//}

@Repository
public interface QesRepository extends JpaRepository<tb_question, Long> {

}
