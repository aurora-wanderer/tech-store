package org.techstore.fullstack.service;

import org.techstore.fullstack.web.response.CategoryResponse;

import java.util.List;

public interface CategoryService {

    List<CategoryResponse> getAll(String name);
}
