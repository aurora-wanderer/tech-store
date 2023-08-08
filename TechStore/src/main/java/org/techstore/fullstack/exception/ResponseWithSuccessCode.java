package org.techstore.fullstack.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class ResponseWithSuccessCode extends RuntimeException {
    private final int code;
    private final String message;
}
