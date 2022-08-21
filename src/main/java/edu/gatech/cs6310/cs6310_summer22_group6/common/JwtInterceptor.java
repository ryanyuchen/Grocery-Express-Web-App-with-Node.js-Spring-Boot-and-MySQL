package edu.gatech.cs6310.cs6310_summer22_group6.common;

import cn.hutool.core.util.StrUtil;
import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTDecodeException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import edu.gatech.cs6310.cs6310_summer22_group6.entity.User;
import edu.gatech.cs6310.cs6310_summer22_group6.exception.Code;
import edu.gatech.cs6310.cs6310_summer22_group6.exception.ServiceException;
import edu.gatech.cs6310.cs6310_summer22_group6.mapper.UserMapper;
//import jdk.internal.dynalink.support.NameCodec;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;

public class JwtInterceptor implements HandlerInterceptor {



    // learn from https://gitee.com/xqnode/pure-design/blob/master/doc/
    @Autowired
    private UserMapper userMapper;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) {
        String token = request.getHeader("token");
        //
        if (!(handler instanceof HandlerMethod)) {
            return true;
        }
        // If blank
        if (StrUtil.isBlank(token)) {
            throw new ServiceException(Code.CODE_304, "No token found, please log in");
        }
        // Find userId
        String userId;
        try {
            userId = JWT.decode(token).getAudience().get(0);
        } catch (JWTDecodeException j) {
            throw new ServiceException(Code.CODE_305, "Token verification failed, please log in");
        }
        //
        List<User> userList = userMapper.findUserById(Integer.valueOf(userId));
        if (userList.size() == 0) {
            throw new ServiceException(Code.CODE_301, "User does not exist");
        }
        User user = userList.get(0);
        // Verify password
        JWTVerifier jwtVerifier = JWT.require(Algorithm.HMAC256(user.getPassword())).build();
        try {
            jwtVerifier.verify(token);
        } catch (JWTVerificationException e) {
            throw new ServiceException(Code.CODE_305, "Token verification failed, please log in");
        }
        return true;
    }
}
