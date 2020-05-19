package cn.edu.hainanu.controller;

import cn.edu.hainanu.pojo.User;
import cn.edu.hainanu.service.UserService;
import cn.edu.hainanu.util.JSONChange;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * @ClassName : UserController
 * @Author : Jett
 * @Date : 2020/5/10 13:08
 * @Description :
 **/

@Controller
public class UserController {

    @Autowired
    UserService userService;

    @RequestMapping("/user/register")
    @ResponseBody
    public String handleRegister(@RequestBody User u) {
        int i = userService.add(u);
        if (i != 0) {
            return "1";
        } else {
            return "";
        }
    }

    @RequestMapping("/user/login")
    @ResponseBody
    public String handleLogin(@RequestBody User u) {
        User user = userService.getByEmailPassword(u);
        if (user != null) {
            return JSONChange.objectToJson(user);
        } else {
            return "";
        }
    }
    @RequestMapping("/user/account")
    @ResponseBody
    public String handleAccount(@RequestBody User u) {
        User user = userService.getByEmail(u);
        if (user != null) {
            return JSONChange.objectToJson(user);
        } else {
            return "";
        }
    }
}
