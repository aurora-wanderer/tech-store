package org.techstore.fullstack.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.techstore.fullstack.model.Customer;
import org.techstore.fullstack.model.JwtToken;
import org.techstore.fullstack.repository.JwtTokenRepository;
import org.techstore.fullstack.service.JwtTokenService;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class JwtTokenServiceImpl implements JwtTokenService {

    private final JwtTokenRepository tokenRepository;

    @Override
    public void saveToken(Customer customer, String token) {
        final LocalDateTime now = LocalDateTime.now();

        JwtToken jwtToken = JwtToken.builder()
                .token(token)
                .customer(customer)
                .createdAt(now)
                .expiredAt(now.plusMinutes(30))
                .confirmAt(null)
                .build();

        tokenRepository.save(jwtToken);
    }

    @Override
    public void verificationToken(String token) {
        Optional<JwtToken> foundToken = tokenRepository.findByToken(token);
        if (foundToken.isPresent()) {
            JwtToken tokenizer = foundToken.get();
            tokenizer.setConfirmAt(LocalDateTime.now());
            tokenRepository.save(tokenizer);
        }
    }

    @Override
    public boolean isTokenConfirm(String token) {
        Optional<JwtToken> foundToken = tokenRepository.findByToken(token);
        return foundToken.filter(jwtToken -> jwtToken.getConfirmAt() != null).isPresent();
    }
}
