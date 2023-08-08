package org.techstore.fullstack.mapper;

import org.springframework.stereotype.Component;
import org.techstore.fullstack.repository.info.CategoryInfo;
import org.techstore.fullstack.web.response.CategoryResponse;

@Component
public class CategoryMapper {

    public CategoryResponse toCategoryResponse(CategoryInfo info) {
        return CategoryResponse.builder()
                .id(info.getId())
                .name(info.getCategoryName())
                .brand(info.getCategoryBrand())
                .build();
    }
}
