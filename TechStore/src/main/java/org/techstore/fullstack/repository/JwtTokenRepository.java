package org.techstore.fullstack.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.techstore.fullstack.model.JwtToken;

import java.util.Optional;

public interface JwtTokenRepository extends JpaRepository<JwtToken, Integer>, JpaSpecificationExecutor<JwtToken> {
    Optional<JwtToken> findByToken(String token);
}