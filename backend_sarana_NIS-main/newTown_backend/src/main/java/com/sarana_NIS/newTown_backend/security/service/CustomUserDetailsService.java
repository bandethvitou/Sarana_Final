package com.sarana_NIS.newTown_backend.security.service;

import com.sarana_NIS.newTown_backend.model.entity.core.User;
import com.sarana_NIS.newTown_backend.model.enums.UserStatus;
import com.sarana_NIS.newTown_backend.repository.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    public CustomUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    @Transactional(readOnly = true)
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found: " + username));
        return build(user);
    }

    @Transactional(readOnly = true)
    public UserDetails loadUserById(Long id) {
        return build(userRepository.findById(id)
                .orElseThrow(() -> new UsernameNotFoundException("User not found: id=" + id)));
    }

    @Transactional(readOnly = true)
    public UserDetails loadUserByEmail(String email) {
        return build(userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found: email=" + email)));
    }

    private UserDetails build(User user) {
        if (user.getUserStatus() != UserStatus.ACTIVE) {
            throw new UsernameNotFoundException("Account is not active: " + user.getUserStatus());
        }
        if (user.getRole() == null) {
            throw new UsernameNotFoundException("User has no role assigned");
        }

        return CustomUserDetails.builder()
                .id(user.getId())
                .username(user.getUsername())
                .email(user.getEmail())
                .password(user.getPasswordHash())
                .fullName(user.getFullName())
                // THIS IS THE FIX: Pulling from the single Enum, not the empty M2M set
                .roles(List.of("ROLE_" + user.getRole().name()))
                .userStatus(user.getUserStatus())
                .isEmailVerified(user.getIsEmailVerified())
                .build();
    }
}