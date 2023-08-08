package org.techstore.fullstack.web.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SignUpRequest implements Serializable {

    @NotBlank
    @Email(
            regexp = "^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$",
            message = "Email format invalid"
    )
    private String email;

    @NotBlank
    @Size(max = 40, message = "Name length should not be greater than 40 characters")
    private String name;

    @NotBlank
    @Size(min = 6, max = 20, message = "password length should be between 6 and 20 characters")
    private String password;
}
