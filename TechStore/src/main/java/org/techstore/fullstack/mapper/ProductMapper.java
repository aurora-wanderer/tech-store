package org.techstore.fullstack.mapper;

import org.springframework.stereotype.Component;
import org.techstore.fullstack.repository.info.ProductInfo;
import org.techstore.fullstack.web.response.ProductDetailsResponse;
import org.techstore.fullstack.web.response.ProductResponse;

@Component
public class ProductMapper {
    public ProductResponse toProductResponse(ProductInfo productInfo) {
        return ProductResponse.builder()
                .id(productInfo.getId())
                .name(productInfo.getName())
                .thumbnail(productInfo.getThumbnail())
                .category(productInfo.getCategory().getCategoryName())
                .description(productInfo.getDescription())
                .brand(productInfo.getCategory().getCategoryBrand())
                .price(productInfo.getPrice())
                .rating(productInfo.getTotalRating())
                .averageRating(productInfo.getAverageRating())
                .build();
    }

    public ProductDetailsResponse toProductDetails(ProductInfo productInfo) {
        return ProductDetailsResponse.builder()
                .id(productInfo.getId())
                .name(productInfo.getName())
                .thumbnail(productInfo.getThumbnail())
                .description(productInfo.getDescription())
                .price(productInfo.getPrice())
                .reviews(productInfo.getReviews())
                .build();
    }
}
