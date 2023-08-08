package org.techstore.fullstack.web.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProductDetailsResponse {
    private Integer id;

    private String name;

    private String thumbnail;

    private String description;

    private BigDecimal price;

    private Object reviews;
}
