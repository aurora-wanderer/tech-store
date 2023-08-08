package org.techstore.fullstack.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.view.RedirectView;
import org.techstore.fullstack.service.AuthService;
import org.techstore.fullstack.web.request.SignInRequest;
import org.techstore.fullstack.web.request.SignUpRequest;
import org.techstore.fullstack.web.response.SignInResponse;
import org.techstore.fullstack.web.response.SignUpResponse;

@RestController
@RequestMapping(path = "/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @GetMapping(path = "/registration/confirm")
    public RedirectView confirmAccount(@RequestParam("token") String token) {
        authService.confirmAccount(token);
        return new RedirectView("http://localhost:3000");
    }

    @PostMapping("/registration/reconfirm")
    public String reConfirmAccount(
            @RequestParam("email") String email,
            @RequestParam("token") String token
    ) {
        authService.sendingConfirmEmail(email, token);
        return token;
    }

    @PostMapping("/sign-up")
    public ResponseEntity<SignUpResponse> signUp(@RequestBody @Valid SignUpRequest request) {
        SignUpResponse registered = authService.register(request);
        return new ResponseEntity<>(registered, HttpStatus.CREATED);
    }

    @PostMapping("/sign-in")
    public ResponseEntity<SignInResponse> authenticate(@RequestBody @Valid SignInRequest request) {
        SignInResponse signInResponse = authService.login(request);
        return ResponseEntity.ok(signInResponse);
    }
}
