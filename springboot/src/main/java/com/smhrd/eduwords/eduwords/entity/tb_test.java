package com.smhrd.eduwords.eduwords.entity;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.*;

import javax.persistence.Column;
import javax.persistence.Table;

@Entity
@Getter
@Setter
@Table(name="tb_test")
@NoArgsConstructor
@AllArgsConstructor
@Data
public class tb_test {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long test_seq;

    @Column(name = "mem_id")
    private String memId;
    @Column(name = "work_seq")
    private Long workSeq;
    private String answer;
    private String answer_check;
    private String workbook_name;
    private String workbook_qes;
    private String submitted_at;
    private String deadline;
    private String startline;
    @Column(name = "mem_name")
    private String memName;
}
