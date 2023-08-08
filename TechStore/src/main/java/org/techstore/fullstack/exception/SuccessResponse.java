package org.techstore.fullstack.exception;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SuccessResponse {

    private UUID uuid;
    private int successCode;
    private String message;
}
