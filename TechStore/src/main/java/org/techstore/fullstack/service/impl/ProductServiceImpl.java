package org.techstore.fullstack.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.techstore.fullstack.mapper.ProductMapper;
import org.techstore.fullstack.repository.ProductRepository;
import org.techstore.fullstack.repository.info.ProductInfo;
import org.techstore.fullstack.service.ProductService;
import org.techstore.fullstack.web.response.ProductDetailsResponse;
import org.techstore.fullstack.web.response.ProductResponse;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;
    private final ProductMapper mapper;

    @Override
    public List<ProductResponse> getAllProducts() {
        List<ProductInfo> productInfo = productRepository.findAllBy(ProductInfo.class);
        return productInfo.stream().map(mapper::toProductResponse).toList();
    }

    @Override
    public List<ProductResponse> getAllProductsBy(String name) {
        return productRepository.findByCategory_CategoryName(name, ProductInfo.class).stream()
                .map(mapper::toProductResponse).toList();
    }

    @Override
    public ProductDetailsResponse getProductDetails(Integer id) {
        ProductInfo productInfo = productRepository.findById(id, ProductInfo.class);
        return mapper.toProductDetails(productInfo);
    }
}
