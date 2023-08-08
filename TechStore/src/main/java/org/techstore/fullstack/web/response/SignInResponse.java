package org.techstore.fullstack.web.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SignInResponse implements Serializable {

    private String email;
    private String name;
    private String accessToken;
    private boolean enabled;
    private static final String TOKEN_TYPE = "Bearer";

    public SignInResponse(String accessToken, boolean enabled) {
        this.accessToken = accessToken;
        this.enabled = enabled;
    }
}
