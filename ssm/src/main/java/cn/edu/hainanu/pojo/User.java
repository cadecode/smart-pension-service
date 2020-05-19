package cn.edu.hainanu.pojo;

/**
 * @ClassName : User
 * @Author : Jett
 * @Date : 2020/5/10 12:51
 * @Description :
 **/

public class User {
    String id;
    String email;
    String password;
    String name;
    String registerDate;
    String avatar;

    @Override
    public String toString() {
        return "User{" + "id='" + id + '\'' + ", email='" + email + '\'' + ", password='" + password + '\'' + ", name='" + name + '\'' + ", registerDate='" + registerDate + '\'' + ", avatar='" + avatar + '\'' + '}';
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getRegisterDate() {
        return registerDate;
    }

    public void setRegisterDate(String registerDate) {
        this.registerDate = registerDate;
    }

    public String getAvatar() {
        return avatar;
    }

    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }
}
