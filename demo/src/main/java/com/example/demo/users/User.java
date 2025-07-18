package com.example.demo.users;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import jakarta.persistence.OneToMany;



@Entity
@Table(name = "pouzivatelia")
public class User {

    @OneToMany (mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List <UserParameter> parameters;

    public List<UserParameter> getParametres(){
        return parameters;
    }
    public void setParameters(List<UserParameter> parameters) {
    this.parameters = parameters;
}

    @Id
    @SequenceGenerator(name = "user_sequence", sequenceName = "user_sequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "user_sequence")    

    private Long id;
    private String name;
    private String email;
    private String isAdmin;
    private Long departmentId;
    private long telephone;
    private String workStartDate;
    private String workEndDate;


    // with no id
    public User(String name, String email, String isAdmin, Long departmentId, long telephone, String workStartDate,
            String workEndDate) {
        this.name = name;
        this.email = email;
        this.isAdmin = isAdmin;
        this.departmentId = departmentId;
        this.telephone = telephone;
        this.workStartDate = workStartDate;
        this.workEndDate = workEndDate;
    }
// all
    public User(Long id, String name, String email, String isAdmin, Long departmentId, long telephone,
            String workStartDate, String workEndDate) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.isAdmin = isAdmin;
        this.departmentId = departmentId;
        this.telephone = telephone;
        this.workStartDate = workStartDate;
        this.workEndDate = workEndDate;
    }
// empty constructor
    public User() {
    }
// getter and setters
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public String getIsAdmin() {
        return isAdmin;
    }
    public void setIsAdmin(String isAdmin) {
        this.isAdmin = isAdmin;
    }
    public Long getDepartmentId() {
        return departmentId;
    }
    public void setDepartmentId(Long departmentId) {
        this.departmentId = departmentId;
    }
    public long getTelephone() {
        return telephone;
    }
    public void setTelephone(long telephone) {
        this.telephone = telephone;
    }
    public String getWorkStartDate() {
        return workStartDate;
    }
    public void setWorkStartDate(String workStartDate) {
        this.workStartDate = workStartDate;
    }
    public String getWorkEndDate() {
        return workEndDate;
    }
    public void setWorkEndDate(String workEndDate) {
        this.workEndDate = workEndDate;
    }
    // toString method
@Override
    public String toString() {
        return "User [id=" + id + ", name=" + name + ", email=" + email + ", isAdmin=" + isAdmin + ", departmentId="
                + departmentId + ", telephone=" + telephone + ", workStartDate=" + workStartDate + ", workEndDate="
                + workEndDate + "]";
    }
}
