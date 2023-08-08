package org.techstore.fullstack.service;

import org.techstore.fullstack.model.Customer;

public interface JwtTokenService {
    void saveToken(Customer customer, String token);

    void verificationToken(String token);

    boolean isTokenConfirm(String token);
}
