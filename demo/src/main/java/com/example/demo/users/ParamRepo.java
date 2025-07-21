package com.example.demo.users;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface ParamRepo extends JpaRepository<Param, Long> {
	    List<Param> findAllByUserId(Long userId);
Param findByUserIdAndParamName(Long userId, String paramName);

}
