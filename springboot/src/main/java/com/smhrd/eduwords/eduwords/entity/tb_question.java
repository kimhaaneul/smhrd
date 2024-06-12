package com.smhrd.eduwords.eduwords.entity;

import lombok.*;

import javax.persistence.*;

//@Entity
//@Table(name = "tb_test")
//@AllArgsConstructor
//@NoArgsConstructor
//@Setter
//@Getter
//public class QesEntity {
//    @Id
//    private Long qes_seq;
//
//    private String qes_desc;
//    private String qes_detail;
//    private String qes_answer;
//    private String qes_level;
//}

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
@Getter
@Setter
@Table(name="tb_question")
@NoArgsConstructor
@AllArgsConstructor
@Data
public class tb_question {

    @Id
    @jakarta.persistence.GeneratedValue(strategy = jakarta.persistence.GenerationType.IDENTITY)
    private Long qes_seq;

    private String qes_desc;
    private String qes_detail;
    private String ex1;
    private String ex2;
    private String ex3;
    private String ex4;
    private String ex5;
    private String qes_answer;
    private String qes_level;
    private String qes_type;
}
