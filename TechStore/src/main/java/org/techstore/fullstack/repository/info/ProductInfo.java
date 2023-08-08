package org.techstore.fullstack.repository.info;

import java.math.BigDecimal;
import java.util.Set;

/**
 * Projection for {@link org.techstore.fullstack.model.Product}
 */
public interface ProductInfo {
    Integer getId();

    String getName();

    String getThumbnail();

    String getDescription();

    BigDecimal getPrice();

    CategoryInfo getCategory();

    Set<ReviewsInfo> getReviews();

    default Integer getTotalRating() {
        return getReviews().size();
    }

    default Double getAverageRating() {
        return getReviews().stream()
                .mapToDouble(ReviewsInfo::getRating)
                .average()
                .orElse(0.0);
    }

    interface CategoryInfo {

        String getCategoryName();

        String getCategoryBrand();
    }

    interface ReviewsInfo {
        Integer getRating();

        String getComment();

        CustomerWithName getCustomer();

        interface CustomerWithName {
            String getName();
        }
    }
}