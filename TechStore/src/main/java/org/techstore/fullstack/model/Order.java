package org.techstore.fullstack.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.techstore.fullstack.model.common.DateAudit;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.LinkedHashSet;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "ORDERS", schema = "dbo")
public class Order extends DateAudit {
    @Id
    @Column(name = "ORDER_ID", nullable = false)
    private Integer id;

    @Column(name = "ORDER_DATE")
    private Instant orderDate;

    @Column(name = "TOTAL_AMOUNT", precision = 18, scale = 2)
    private BigDecimal totalAmount;

    @OneToMany(mappedBy = "order")
    private Set<OrderItem> orderItems = new LinkedHashSet<>();
}