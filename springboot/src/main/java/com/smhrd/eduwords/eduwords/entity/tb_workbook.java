package com.smhrd.eduwords.eduwords.entity;

import jakarta.persistence.*;
import lombok.*;

import java.sql.Timestamp;

@Entity
@Getter
@Setter
@Table(name="tb_workbook")
@NoArgsConstructor
@AllArgsConstructor
public class tb_workbook {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long work_seq;
    @Column(name = "mem_id")
    private String memId;
    private String work_name;
    private String deadline;
    private String startline;
    private String work_type;

    private String workbook_qes;
}
