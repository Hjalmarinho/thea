package com.thea.backend.sandbox;

import java.io.Serializable;
import javax.xml.bind.annotation.XmlElement;

public class User implements Serializable
{
   private static final long serialVersionUID = 1L;

   public User(){}

   @XmlElement(name="first_name")
   public String getFirstName() {
      return "Ola";
   }
   
   @XmlElement(name="last_name")
   public String getLastName() {
      return "Nordmann";
   }
}