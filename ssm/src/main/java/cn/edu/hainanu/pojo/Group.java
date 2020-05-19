package cn.edu.hainanu.pojo;

/**
 * @ClassName : Group
 * @Author : Jett
 * @Date : 2020/5/11 10:37
 * @Description :
 **/

public class Group {
    String id;
    String email;
    String password;
    String name;
    String address;
    String avatar;
    String image;
    String corporateName;
    String corporateId;
    String creditCode;
    String principalName;
    String contactTel;
    String price;
    String category;
    String prop;
    String foundDate;
    String registerDate;
    String see;

    @Override
    public String toString() {
        return "Group{" + "id='" + id + '\'' + ", email='" + email + '\'' + ", password='" + password + '\'' + ", name='" + name + '\'' + ", address='" + address + '\'' + ", avatar='" + avatar + '\'' + ", image='" + image + '\'' + ", corporateName='" + corporateName + '\'' + ", corporateId='" + corporateId + '\'' + ", creditCode='" + creditCode + '\'' + ", principalName='" + principalName + '\'' + ", contactTel='" + contactTel + '\'' + ", price='" + price + '\'' + ", category='" + category + '\'' + ", prop='" + prop + '\'' + ", foundDate='" + foundDate + '\'' + ", registerDate='" + registerDate + '\'' + ", see='" + see + '\'' + '}';
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

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getAvatar() {
        return avatar;
    }

    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getCorporateName() {
        return corporateName;
    }

    public void setCorporateName(String corporateName) {
        this.corporateName = corporateName;
    }

    public String getCorporateId() {
        return corporateId;
    }

    public void setCorporateId(String corporateId) {
        this.corporateId = corporateId;
    }

    public String getCreditCode() {
        return creditCode;
    }

    public void setCreditCode(String creditCode) {
        this.creditCode = creditCode;
    }

    public String getPrincipalName() {
        return principalName;
    }

    public void setPrincipalName(String principalName) {
        this.principalName = principalName;
    }

    public String getContactTel() {
        return contactTel;
    }

    public void setContactTel(String contactTel) {
        this.contactTel = contactTel;
    }

    public String getPrice() {
        return price;
    }

    public void setPrice(String price) {
        this.price = price;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getProp() {
        return prop;
    }

    public void setProp(String prop) {
        this.prop = prop;
    }

    public String getFoundDate() {
        return foundDate;
    }

    public void setFoundDate(String foundDate) {
        this.foundDate = foundDate;
    }

    public String getRegisterDate() {
        return registerDate;
    }

    public void setRegisterDate(String registerDate) {
        this.registerDate = registerDate;
    }

    public String getSee() {
        return see;
    }

    public void setSee(String see) {
        this.see = see;
    }
}
