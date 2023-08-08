package org.techstore.fullstack.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.techstore.fullstack.service.CategoryService;
import org.techstore.fullstack.web.response.CategoryResponse;

import java.util.List;

@RestController
@RequestMapping("api/v1/category")
@RequiredArgsConstructor
public class CategoryController {

    private final CategoryService categoryService;

    @GetMapping("/{name}/all")
    public ResponseEntity<List<CategoryResponse>> fetchCategories(@PathVariable("name") String name) {
        var list = categoryService.getAll(name);
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

}
