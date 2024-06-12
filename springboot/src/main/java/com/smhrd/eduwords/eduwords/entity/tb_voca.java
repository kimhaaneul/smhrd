package com.smhrd.eduwords.eduwords.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.*;

import javax.persistence.*;
import java.util.Date;

@Entity
@Getter
@Setter
@Table(name="tb_question")
@NoArgsConstructor
@AllArgsConstructor
@Data
public class tb_voca {
    @Id
    @jakarta.persistence.GeneratedValue(strategy = jakarta.persistence.GenerationType.IDENTITY)
    private Long voca_seq;

    @Column(name = "mem_id")
    private String memId;
    @Column(name = "voca_word")
    private String vocaWord;

    @Column(name = "voca_mean")
    private String vocaMean;
    private String created_at;
    private String voca_status;
    private String voca_class;
}
