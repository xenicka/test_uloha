package com.example.demo.users;


import java.util.ArrayList;
import java.util.List;


import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import jakarta.persistence.Version;


@Entity
@Table(name = "pouzivatelia")
public class User {

    @Id
    @SequenceGenerator(name = "user_sequence", sequenceName = "user_sequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "user_sequence")    

    private Long id;
    private String name;
    private String email;
    private String isAdmin;
   
    @Version
    private Long version;

    public User(String name, String email, String isAdmin) {
        this.name = name;
        this.email = email;
        this.isAdmin = isAdmin;
      
    }




@OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Param> parameters = new ArrayList<>();



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

    
    // toString method
@Override
    public String toString() {
        return "User [id=" + id + ", name=" + name + ", email=" + email + ", isAdmin=" + isAdmin  + "]";
    }

}