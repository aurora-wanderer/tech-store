package org.techstore.fullstack.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.Collections;
import java.util.List;
import java.util.UUID;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(RunTimeExceptionPlaceholder.class)
    public ResponseEntity<ErrorResponse> handleException(RunTimeExceptionPlaceholder ex) {
        var errorResponse = ErrorResponse.builder()
                .uuid(UUID.randomUUID())
                .errors(Collections.singletonList(new Error(HttpStatus.BAD_REQUEST, ex.getMessage())))
                .build();

        return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(EmailAlreadyExistsException.class)
    public ResponseEntity<ErrorResponse> handleException(EmailAlreadyExistsException ex) {
        var errorResponse = ErrorResponse.builder()
                .uuid(UUID.randomUUID())
                .errors(Collections.singletonList(new Error(HttpStatus.SEE_OTHER, ex.getMessage())))
                .build();

        return new ResponseEntity<>(errorResponse, HttpStatus.SEE_OTHER);
    }


    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleException(Exception ex) {
        var errorResponse = ErrorResponse.builder()
                .uuid(UUID.randomUUID())
                .errors(Collections.singletonList(new Error(ex.getCause(), ex.getMessage())))
                .build();

        return new ResponseEntity<>(errorResponse, HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(ResponseWithSuccessCode.class)
    public ResponseEntity<SuccessResponse> handleException(ResponseWithSuccessCode ex) {
        var successResponse = SuccessResponse.builder()
                .uuid(UUID.randomUUID())
                .successCode(ex.getCode())
                .message(ex.getMessage())
                .build();

        return new ResponseEntity<>(successResponse, HttpStatus.valueOf(ex.getCode()));
    }

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleException(ResourceNotFoundException ex) {
        var errorResponse = ErrorResponse.builder()
                .uuid(UUID.randomUUID())
                .errors(Collections.singletonList(new Error(HttpStatus.NOT_FOUND, ex.getMessage())))
                .build();

        return new ResponseEntity<>(errorResponse, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> handleValidationException(MethodArgumentNotValidException ex) {
        BindingResult bindingResult = ex.getBindingResult();
        List<FieldError> fieldErrors = bindingResult.getFieldErrors();

        var errorResponse = ErrorResponse.builder()
                .uuid(UUID.randomUUID())
                .errors(executeFieldError(fieldErrors))
                .build();

        return ResponseEntity.badRequest().body(errorResponse);
    }

    private List<Error> executeFieldError(List<FieldError> fieldErrors) {
        return fieldErrors.stream().map(this::fieldErrorToError).toList();
    }

    private Error fieldErrorToError(FieldError fieldError) {
        return Error.builder()
                .ref(fieldError.getField())
                .message(fieldError.getDefaultMessage())
                .build();
    }

}