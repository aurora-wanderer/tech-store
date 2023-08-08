package org.techstore.fullstack.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Nationalized;

import java.util.LinkedList;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "CATEGORIES", schema = "dbo")
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "CATEGORY_ID", nullable = false)
    private Integer id;

    @Size(max = 255)
    @Nationalized
    @Column(name = "CATEGORY_NAME")
    private String categoryName;

    @Size(max = 255)
    @Nationalized
    @Column(name = "CATEGORY_BRAND")
    private String categoryBrand;

    @OneToMany(mappedBy = "category")
    private List<Product> products = new LinkedList<>();

}