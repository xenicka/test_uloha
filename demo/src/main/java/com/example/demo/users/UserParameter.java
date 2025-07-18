package com.example.demo.users;

import jakarta.persistence.*;

@Entity
@Table(name="user_parametres")
public class UserParameter {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private Long id; 
    private String nameParameter;
    private String valueParamater;
   
    @ManyToOne
    @JoinColumn(name="user_id",nullable = false)

    private User user;

    public UserParameter(){}
    public UserParameter(String nameParameter, String valueParamater,User user){
        this.nameParameter = nameParameter;
        this.valueParamater = valueParamater;
        this.user = user;

     }
   
    public Long getId() {
        return id;
    }
    public String getNameParameter() {
        return nameParameter;
    }
    public void setNameParameter(String nameParameter) {
        this.nameParameter = nameParameter;
    }
    public String getValueParamater() {
        return valueParamater;
    }
    public void setValueParamater(String valueParamater) {
        this.valueParamater = valueParamater;
    }
    public User getUser() {
        return user;
    }
    public void setUser(User user) {
        this.user = user;
    }



}
