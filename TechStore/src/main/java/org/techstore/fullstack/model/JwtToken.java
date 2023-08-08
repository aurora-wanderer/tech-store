package org.techstore.fullstack.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "JWT_TOKEN")
public class JwtToken {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "JWT_TOKEN_ID", nullable = false)
    private Integer id;
    @Column(name = "TOKEN", nullable = false)
    private String token;
    @Column(name = "CREATED_AT", nullable = false)
    private LocalDateTime createdAt;
    @Column(name = "EXPIRED_AT", nullable = false)
    private LocalDateTime expiredAt;
    @Column(name = "CONFIRM_AT", nullable = false)
    private LocalDateTime confirmAt;
    @ManyToOne
    @JoinColumn(nullable = false, name = "CUSTOMER_ID")
    private Customer customer;
}
