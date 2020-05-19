package cn.edu.hainanu.mapper;

import cn.edu.hainanu.pojo.Group;

import java.util.List;

/**
 * @InterfaceName : GroupMapper
 * @Author : Jett
 * @Date : 2020/5/11 11:50
 * @Description :
 **/

public interface GroupMapper {
    int insert(Group g);

    Group selectWhereEmailPassword(Group g);

    Group selectWhereEmail(Group g);

    Group selectFieldsWhereEmail(Group g);

    List<Group> selectListTop();

    List<Group> selectList(Group g, String sort, String start);
}
