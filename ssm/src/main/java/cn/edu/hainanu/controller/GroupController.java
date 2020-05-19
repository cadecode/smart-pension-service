package cn.edu.hainanu.controller;

import cn.edu.hainanu.pojo.Group;
import cn.edu.hainanu.service.GroupService;
import cn.edu.hainanu.util.JSONChange;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

/**
 * @ClassName : GroupController
 * @Author : Jett
 * @Date : 2020/5/11 12:58
 * @Description :
 **/

@Controller
public class GroupController {
    @Autowired
    GroupService groupService;

    @RequestMapping("/group/register")
    @ResponseBody
    public String handleRegister(@RequestBody Group u) {
        int i = groupService.add(u);
        if (i != 0) {
            return "1";
        } else {
            return "";
        }
    }

    @RequestMapping("/group/login")
    @ResponseBody
    public String handleLogin(@RequestBody Group g) {
        Group group = groupService.getByEmailPassword(g);
        if (group != null) {
            return JSONChange.objectToJson(group);
        } else {
            return "";
        }
    }

    @RequestMapping("/group/account")
    @ResponseBody
    public String handleAccount(@RequestBody Group g) {
        Group group = groupService.getByEmail(g);
        if (group != null) {
            return JSONChange.objectToJson(group);
        } else {
            return "";
        }
    }

    @RequestMapping("/group/recommend")
    @ResponseBody
    public String handleRecommend() {
        List<Group> list = groupService.getListTop();
        return JSONChange.objectToJson(list);
    }

    @RequestMapping("/group/info")
    @ResponseBody
    public String handleInfo(@RequestBody Group g) {
        Group group = groupService.getInfoByEmail(g);
        if (group != null) {
            return JSONChange.objectToJson(group);
        } else {
            return "";
        }
    }

    @RequestMapping("/groups")
    @ResponseBody
    public String handleGroups(@RequestBody String jsonStr) {
        String sort = JSONChange.getNodeString(jsonStr, "sort");
        String start = JSONChange.getNodeString(jsonStr, "start");
        Group g = (Group) JSONChange.jsonToObject(jsonStr, Group.class);
        List<Group> list = groupService.getList(g, sort, start);
        return JSONChange.objectToJson(list);
    }
}
