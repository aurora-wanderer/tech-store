package org.techstore.fullstack.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.*;
import org.hibernate.annotations.Nationalized;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.techstore.fullstack.model.common.DateAudit;

import java.io.Serializable;
import java.util.Collection;
import java.util.Collections;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
@Entity
@Table(name = "CUSTOMERS", schema = "dbo")
public class Customer extends DateAudit implements UserDetails, Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "CUSTOMER_ID", nullable = false)
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

    @Size(max = 20)
    @Nationalized
    @Column(name = "PHONE", length = 20)
    private String phone;

    @Size(max = 255)
    @Nationalized
    @Column(name = "ADDRESS")
    private String address;

    @Column(name = "REWARD_POINTS")
    private Double rewardPoints;

    @Column(name = "VERIFICATION")
    private boolean verification;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        SimpleGrantedAuthority authority = new SimpleGrantedAuthority("CUSTOMER");
        return Collections.singletonList(authority);
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return verification;
    }
}