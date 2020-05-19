package cn.edu.hainanu.service;

import cn.edu.hainanu.mapper.UserMapper;
import cn.edu.hainanu.pojo.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * @ClassName : UserService
 * @Author : Jett
 * @Date : 2020/5/10 14:46
 * @Description :
 **/

@Service
public class UserService {

    @Autowired
    UserMapper userMapper;

    public int add(User u) {
        try {
            return userMapper.insert(u);
        }
        catch (Exception e) {
            e.printStackTrace();
            return 0;
        }
    }

    public User getByEmailPassword(User u) {
        return userMapper.selectWhereEmailPassword(u);
    }

    public User getByEmail(User u) {
        return userMapper.selectWhereEmail(u);
    }


}
