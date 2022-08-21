package edu.gatech.cs6310.cs6310_summer22_group6.utils;

import cn.hutool.core.util.StrUtil;
import com.auth0.jwt.JWT;
import cn.hutool.core.date.DateUtil;
import com.auth0.jwt.algorithms.Algorithm;
import edu.gatech.cs6310.cs6310_summer22_group6.entity.User;
import edu.gatech.cs6310.cs6310_summer22_group6.exception.Code;
import edu.gatech.cs6310.cs6310_summer22_group6.exception.ServiceException;
import edu.gatech.cs6310.cs6310_summer22_group6.mapper.UserMapper;
import edu.gatech.cs6310.cs6310_summer22_group6.service.UserService;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.annotation.PostConstruct;
import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.Date;

@Component
public class TokenUtils {

    private static UserMapper staticUserMapper;

    @Resource
    private UserMapper userMapper;

    @PostConstruct
    public void setStaticUserService(){
        staticUserMapper = userMapper;
    }

    public static String genToken(String userId, String sign) {
        return JWT.create().withAudience(userId)
                .withExpiresAt(DateUtil.offsetHour(new Date(), 1)) // token will expire in 1 hour
                .sign(Algorithm.HMAC256(sign)); // use password as signature
    }

    //get current user with a static method
    public static User getCurrentUser() {
        try {
            HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
            String token = request.getHeader("token");
            if (StrUtil.isNotBlank(token)) {
                String userId = JWT.decode(token).getAudience().get(0);
                return staticUserMapper.findUserById(Integer.valueOf(userId)).get(0);
            }
        } catch (Exception e) {
            return null;
        }
        return null;
    }

    public static void checkAuthorization(Integer role){
        if(role == 2){
            return;
        }
        User user = getCurrentUser();
        if(getCurrentUser().getRole() != role){
            throw new ServiceException(Code.CODE_307, "User is not authorized for this function");
        }
        return;
    }
}

