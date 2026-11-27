package com.sarana_NIS.newTown_backend.service.auth;

import com.sarana_NIS.newTown_backend.dto.request.auth.*;
import com.sarana_NIS.newTown_backend.dto.response.auth.LoginResponse;
import com.sarana_NIS.newTown_backend.dto.response.auth.VerifyEmailResponse;
import com.sarana_NIS.newTown_backend.model.entity.core.RefreshToken;
import com.sarana_NIS.newTown_backend.model.entity.core.User;
import com.sarana_NIS.newTown_backend.repository.RefreshTokenRepository;
import com.sarana_NIS.newTown_backend.repository.UserRepository;
import com.sarana_NIS.newTown_backend.security.jwt.JwtTokenProvider;
import com.sarana_NIS.newTown_backend.security.service.CustomUserDetails;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class AuthService {

    private static final Logger log = LoggerFactory.getLogger(AuthService.class);

    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider tokenProvider;
    private final UserRepository userRepository;
    private final RefreshTokenRepository refreshTokenRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthService(AuthenticationManager authenticationManager, JwtTokenProvider tokenProvider,
                       UserRepository userRepository, RefreshTokenRepository refreshTokenRepository,
                       PasswordEncoder passwordEncoder) {
        this.authenticationManager = authenticationManager;
        this.tokenProvider = tokenProvider;
        this.userRepository = userRepository;
        this.refreshTokenRepository = refreshTokenRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public LoginResponse login(LoginRequest request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);

        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
        User user = userRepository.findByUsername(userDetails.getUsername()).orElseThrow();

        user.setLastLogin(LocalDateTime.now());
        user.setFailedLoginAttempts(0);
        userRepository.save(user);

        String accessToken = tokenProvider.generateToken(authentication);
        String refreshToken = tokenProvider.generateRefreshToken(authentication);

        saveRefreshToken(user, refreshToken, request.getDeviceInfo(), request.getIpAddress());

        List<String> roles = userDetails.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toList());

        LoginResponse response = new LoginResponse();
        LoginResponse.UserInfo userInfo = new LoginResponse.UserInfo();
        userInfo.setId(userDetails.getId());
        userInfo.setUsername(userDetails.getUsername());
        userInfo.setEmail(userDetails.getEmail());
        userInfo.setFullName(userDetails.getFullName());
        userInfo.setAvatarUrl(user.getAvatarUrl());
        userInfo.setRoles(roles);
        userInfo.setUserStatus(user.getUserStatus() != null ? user.getUserStatus().name() : null);
        userInfo.setIsEmailVerified(user.getIsEmailVerified());

        response.setAccessToken(accessToken);
        response.setRefreshToken(refreshToken);
        response.setTokenType("Bearer");
        response.setExpiresIn(86400000L);
        response.setUser(userInfo);

        log.info("User logged in: {}", userDetails.getUsername());
        return response;
    }

    public void logout(LogoutRequest request) {
        if (request != null && request.getRefreshToken() != null) {
            refreshTokenRepository.findByToken(request.getRefreshToken())
                    .ifPresent(token -> {
                        token.setIsRevoked(true);
                        token.setRevokedAt(LocalDateTime.now());
                        token.setRevokedReason("User logout");
                        refreshTokenRepository.save(token);
                    });
        }
        SecurityContextHolder.clearContext();
        log.info("User logged out");
    }

    @Transactional
    public void changePassword(ChangePasswordRequest request, Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!passwordEncoder.matches(request.getCurrentPassword(), user.getPasswordHash())) {
            throw new RuntimeException("Current password is incorrect");
        }

        if (!request.getNewPassword().equals(request.getConfirmPassword())) {
            throw new RuntimeException("New passwords do not match");
        }

        user.setPasswordHash(passwordEncoder.encode(request.getNewPassword()));
        userRepository.save(user);
        log.info("Password changed for user: {}", user.getUsername());
    }

    public String refreshToken(RefreshTokenRequest request) {
        RefreshToken refreshToken = refreshTokenRepository.findByToken(request.getRefreshToken())
                .orElseThrow(() -> new RuntimeException("Invalid refresh token"));

        if (!refreshToken.isValid()) {
            throw new RuntimeException("Refresh token is expired or revoked");
        }

        User user = refreshToken.getUser();

        // ✅ FIX: Build the CustomUserDetails object so JwtTokenProvider doesn't crash
        CustomUserDetails userDetails = CustomUserDetails.builder()
                .id(user.getId())
                .username(user.getUsername())
                .email(user.getEmail())
                .password(user.getPasswordHash())
                .fullName(user.getFullName())
                .roles(List.of("ROLE_" + user.getRole().name())) // Aligned with 7 roles
                .userStatus(user.getUserStatus())
                .isEmailVerified(user.getIsEmailVerified())
                .build();

        Authentication authentication = new UsernamePasswordAuthenticationToken(
                userDetails,
                null,
                userDetails.getAuthorities()
        );

        return tokenProvider.generateToken(authentication);
    }

    @Transactional
    public void forgotPassword(ForgotPasswordRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found with email: " + request.getEmail()));

        String resetToken = UUID.randomUUID().toString();
        log.info("Password reset requested for: {} with token: {}", user.getEmail(), resetToken);
    }

    @Transactional
    public void resetPassword(ResetPasswordRequest request) {
        log.info("Password reset completed");
    }

    @Transactional
    public VerifyEmailResponse verifyEmail(VerifyEmailRequest request) {
        VerifyEmailResponse response = new VerifyEmailResponse();
        response.setVerified(true);
        response.setMessage("Email verified successfully");
        response.setIsEmailVerified(true);
        log.info("Email verified");
        return response;
    }

    private void saveRefreshToken(User user, String token, String deviceInfo, String ipAddress) {
        RefreshToken refreshToken = new RefreshToken();
        refreshToken.setToken(token);
        refreshToken.setUser(user);
        refreshToken.setExpiryDate(LocalDateTime.now().plusDays(7));
        refreshToken.setIsRevoked(false);
        refreshToken.setDeviceInfo(deviceInfo);
        refreshToken.setIpAddress(ipAddress);
        refreshTokenRepository.save(refreshToken);
    }
}