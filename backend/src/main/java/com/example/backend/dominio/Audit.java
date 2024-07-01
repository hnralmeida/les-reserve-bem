package com.example.backend.dominio;

import jakarta.persistence.*;
import jakarta.persistence.Id;
import lombok.*;
import org.springframework.data.annotation.*;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.io.Serializable;
import java.util.Date;
import java.util.logging.Logger;

@Entity
@Table(name = "Audit")
@PrimaryKeyJoinColumn(name = "id")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class Audit implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_auditoria_evento")
    @SequenceGenerator(name = "seq_auditoria_evento", sequenceName = "seq_auditoria_evento", allocationSize = 1)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "operation")
    private String operation;

    @Column(name = "timestamp")
    private long timestamp;

    @Column(name= "prestate")
    private String prestate;

    @Column(name= "posstate")
    private String posstate;

    public void onPrePersist(String pos) {
        audit("INSERT");
        this.posstate = pos;
    }

    public void onPreUpdate(String pre, String pos) {
        audit("UPDATE");
        this.prestate = pre;
        this.posstate = pos;
    }

    public void onPreRemove(String pos) {
        audit("DELETE");
        this.posstate = pos;
    }

    private void audit(String operation) {
        setOperation(operation);
        setTimestamp((new Date()).getTime());
    }

}
