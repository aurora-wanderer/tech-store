package org.techstore.fullstack.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.techstore.fullstack.mapper.CategoryMapper;
import org.techstore.fullstack.repository.CategoryRepository;
import org.techstore.fullstack.repository.info.CategoryInfo;
import org.techstore.fullstack.service.CategoryService;
import org.techstore.fullstack.web.response.CategoryResponse;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;
    private final CategoryMapper categoryMapper;

    @Override
    public List<CategoryResponse> getAll(String name) {
        return categoryRepository.findDistinctByCategoryName(name, CategoryInfo.class)
                .stream()
                .map(categoryMapper::toCategoryResponse)
                .toList();
    }
}