package cn.edu.hainanu.service;

import cn.edu.hainanu.mapper.GroupMapper;
import cn.edu.hainanu.pojo.Group;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @ClassName : GroupService
 * @Author : Jett
 * @Date : 2020/5/11 12:06
 * @Description :
 **/

@Service
public class GroupService {
    @Autowired
    GroupMapper groupMapper;

    public int add(Group g) {
        try {
            return groupMapper.insert(g);
        }
        catch (Exception e) {
            e.printStackTrace();
            return 0;
        }
    }

    public Group getByEmailPassword(Group g) {
        return groupMapper.selectWhereEmailPassword(g);
    }

    public Group getByEmail(Group g) {
        return groupMapper.selectWhereEmail(g);
    }

    public Group getInfoByEmail(Group g) {
        return groupMapper.selectFieldsWhereEmail(g);
    }

    public List<Group> getListTop() {
        return groupMapper.selectListTop();
    }

    public List<Group> getList(Group g, String sort, String start) {
        return groupMapper.selectList(g, sort, start);
    }
}
