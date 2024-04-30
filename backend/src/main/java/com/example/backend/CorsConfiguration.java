package com.example.backend;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

// Não tá rodando, pois falta o AppConfiguration
@Configuration
@EnableWebMvc
public class CorsConfiguration implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {

        registry.addMapping("/api/**")
                .allowedOrigins("http://localhost:8081")
                .allowedHeaders("*")
                .allowedMethods("*");
    }
}