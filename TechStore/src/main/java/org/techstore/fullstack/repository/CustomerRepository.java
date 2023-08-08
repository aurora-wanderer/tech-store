package org.techstore.fullstack.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.techstore.fullstack.model.Customer;

import java.util.Optional;

public interface CustomerRepository extends JpaRepository<Customer, Integer>,
        JpaSpecificationExecutor<Customer> {

    boolean existsByEmail(String email);

    Optional<Customer> findByEmail(String email);

    <T> T findByEmail(String email, Class<T> klass);
}