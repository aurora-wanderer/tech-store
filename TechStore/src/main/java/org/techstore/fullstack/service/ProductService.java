package org.techstore.fullstack.service;


import org.techstore.fullstack.web.response.ProductDetailsResponse;
import org.techstore.fullstack.web.response.ProductResponse;

import java.util.List;

public interface ProductService {

    List<ProductResponse> getAllProducts();

    List<ProductResponse> getAllProductsBy(String name);

    ProductDetailsResponse getProductDetails(Integer id);
}
