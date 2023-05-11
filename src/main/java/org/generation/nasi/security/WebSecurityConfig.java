package org.generation.nasi.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

import javax.sql.DataSource;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig {

    // To use the dependency injection method to inject the Datasource interface to WebSecurityConfig class so that we can use the properties or methods from the Datasource Object
    @Autowired
    private DataSource dataSource;

    /*  https://www.tabnine.com/code/java/methods/org.springframework.security.config.annotation.authentication.configurers.provisioning.JdbcUserDetailsManagerConfigurer/authoritiesByUsernameQuery
     */
    @Autowired
    public void configureGlobal(AuthenticationManagerBuilder auth)
            throws Exception {
        auth.jdbcAuthentication()
                .passwordEncoder(new BCryptPasswordEncoder())
                .dataSource(dataSource)
                .usersByUsernameQuery("select username, password, enabled from users where username=?")
                .authoritiesByUsernameQuery("select username, role from users where username=?");
    }

    /*
    https://docs.spring.io/spring-security/reference/servlet/authentication/passwords/jdbc.html
    */
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.csrf().disable();

        http.formLogin().loginPage("/login");

        http.formLogin()
                .defaultSuccessUrl("/dishes03", true);

        http.logout()
                .logoutSuccessUrl("/index");

        http.authorizeHttpRequests((requests) -> requests
                .requestMatchers("/", "/dishes01/**", "/index", "/api/**", "/images/**", "/js/**", "/css/**", "/productimages/**", "/login", "/aboutus").permitAll()
                .requestMatchers("/dishes03/**").hasRole("ADMIN")
        );
        return http.build();
    }

} // End of class
