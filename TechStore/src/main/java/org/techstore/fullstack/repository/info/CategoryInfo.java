package org.techstore.fullstack.repository.info;

import java.util.List;

public interface CategoryInfo {

    Integer getId();

    String getCategoryName();

    String getCategoryBrand();

    List<ProductInfo> getProducts();
}
