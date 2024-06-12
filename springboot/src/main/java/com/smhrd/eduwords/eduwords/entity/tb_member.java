package com.smhrd.eduwords.eduwords.entity;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.*;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Table;

@Entity
@Getter
@Setter
@Table(name="tb_member")
@NoArgsConstructor
@AllArgsConstructor
@Data
public class tb_member {

    @Id
    private String mem_id;

    private String mem_pw;
    private String mem_name;
    private String mem_number;
    private String mem_address;

    @Column(name = "mem_type")
    private String memType;
    private String mem_email;
    private String joined_at;

}
