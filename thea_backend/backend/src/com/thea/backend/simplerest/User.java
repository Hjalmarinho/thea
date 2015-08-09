package com.thea.backend.simplerest;

import java.io.Serializable;

import javax.xml.bind.annotation.XmlElement;

public class User  implements Serializable
{
   private static final long serialVersionUID = 1L;

   public User(){}

   @XmlElement(name="profession-field")
   public String getProfession() {
      return "my profession";
   }
}
