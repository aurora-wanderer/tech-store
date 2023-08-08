package org.techstore.fullstack.service;

import org.techstore.fullstack.web.request.SignInRequest;
import org.techstore.fullstack.web.request.SignUpRequest;
import org.techstore.fullstack.web.response.SignInResponse;
import org.techstore.fullstack.web.response.SignUpResponse;

public interface AuthService {

    SignUpResponse register(SignUpRequest request);

    void confirmAccount(String token);

    SignInResponse login(SignInRequest request);

    void sendingConfirmEmail(String email, String token);
}
