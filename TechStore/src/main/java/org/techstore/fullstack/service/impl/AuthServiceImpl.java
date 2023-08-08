package org.techstore.fullstack.service.impl;

import jakarta.mail.MessagingException;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.techstore.fullstack.exception.EmailAlreadyExistsException;
import org.techstore.fullstack.exception.ResourceNotFoundException;
import org.techstore.fullstack.exception.ResponseWithSuccessCode;
import org.techstore.fullstack.exception.RunTimeExceptionPlaceholder;
import org.techstore.fullstack.model.Customer;
import org.techstore.fullstack.repository.CustomerRepository;
import org.techstore.fullstack.service.AuthService;
import org.techstore.fullstack.service.JwtTokenService;
import org.techstore.fullstack.util.EmailSender;
import org.techstore.fullstack.util.JwtTokenizer;
import org.techstore.fullstack.web.request.SignInRequest;
import org.techstore.fullstack.web.request.SignUpRequest;
import org.techstore.fullstack.web.response.SignInResponse;
import org.techstore.fullstack.web.response.SignUpResponse;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final AuthenticationManager authenticationManager;
    private final CustomerRepository customerRepository;

    private final JwtTokenService jwtTokenService;
    private final JwtTokenizer tokenizer;

    private final PasswordEncoder encoder;
    private final EmailSender emailSender;

    @Override
    public SignUpResponse register(@NonNull SignUpRequest request) {
        boolean emailExists = customerRepository.existsByEmail(request.getEmail());

        if (emailExists)
            throw new EmailAlreadyExistsException("Your email already taken !!!");

        Customer customer = Customer.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(encoder.encode(request.getPassword()))
                .build();

        customer.setCreatedAt(LocalDateTime.now());
        customerRepository.save(customer);

        String token = tokenizer.generateToken(customer);
        jwtTokenService.saveToken(customer, token);
        sendingConfirmEmail(customer.getEmail(), token);

        return SignUpResponse.builder()
                .userId(customer.getId())
                .name(customer.getName())
                .email(customer.getEmail())
                .build();
    }

    @Override
    public void confirmAccount(String token) {
        boolean confirmed = jwtTokenService.isTokenConfirm(token);

        if (confirmed)
            throw new ResponseWithSuccessCode(
                    HttpStatus.CONTINUE.value(),
                    "Email is confirmed"
            );

        jwtTokenService.verificationToken(token);
        String email = tokenizer.getEmailFromToken(token);
        Optional<Customer> byEmail = customerRepository.findByEmail(email);
        if (byEmail.isPresent()) {
            Customer customer = byEmail.get();
            customer.setVerification(true);
            customerRepository.save(customer);
        }
    }

    @Override
    public SignInResponse login(@NonNull SignInRequest request) {
        Optional<Customer> foundAccount = customerRepository.findByEmail(request.getEmail());
        Customer customer = foundAccount.orElseThrow(() -> new ResourceNotFoundException("Account not found"));

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        String accessToken = tokenizer.generateToken(customer);
        SecurityContextHolder.getContext().setAuthentication(authentication);
        return SignInResponse.builder()
                .accessToken(accessToken)
                .email(customer.getEmail())
                .name(customer.getName())
                .enabled(customer.isEnabled())
                .build();
    }

    @Override
    public void sendingConfirmEmail(String email, String token) {
        try {
            emailSender.send(email, token);
        } catch (MessagingException e) {
            throw new RunTimeExceptionPlaceholder("Error while email sending");
        }
    }
}
