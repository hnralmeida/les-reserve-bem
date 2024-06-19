package com.example.backend.dominio;

import org.springframework.security.crypto.argon2.Argon2PasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

public class PasswordUtils {
    private static final PasswordEncoder encoder = Argon2PasswordEncoder.defaultsForSpringSecurity_v5_8();

    public static String generateHash(String password) {
        return encoder.encode(password);
    }

    public static boolean matchPassword(String password, String hash) {
        return encoder.matches(password, hash);
    }
}