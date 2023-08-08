package org.techstore.fullstack.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Nationalized;
import org.techstore.fullstack.model.common.DateAudit;
import org.techstore.fullstack.model.common.Role;

@Getter
@Setter
@Entity
@Table(name = "ADMINISTRATORS", schema = "dbo")
public class Administrator extends DateAudit {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ADMIN_ID", nullable = false)
    private Integer id;

    @Size(max = 255)
    @Nationalized
    @Column(name = "NAME")
    private String name;

    @Size(max = 255)
    @Nationalized
    @Column(name = "EMAIL")
    private String email;

    @Size(max = 255)
    @Nationalized
    @Column(name = "PASSWORD")
    private String password;

    @Column(name = "ROLE")
    @Nationalized
    @Enumerated(EnumType.STRING)
    private Role role = Role.ADMIN;
}