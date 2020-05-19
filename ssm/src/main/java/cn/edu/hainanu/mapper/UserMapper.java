package cn.edu.hainanu.mapper;

import cn.edu.hainanu.pojo.User;

/**
 * @InterfaceName : UserMapper
 * @Author : Jett
 * @Date : 2020/5/10 12:57
 * @Description :
 **/

public interface UserMapper {
    int insert(User u);

    User selectWhereEmailPassword(User u);

    User selectWhereEmail(User u);


}
