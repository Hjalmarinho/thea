package com.thea.backend.production.models;

import java.io.Serializable;
import javax.xml.bind.annotation.XmlElement;

public class Club implements Serializable {
	private static final long serialVersionUID = 1L;
	private Integer club_id;
	private String club_name;
	
	public Club() {
		
	}
	
	public Club(Integer club_id, String club_name) {
		this.club_id = club_id;
		this.club_name = club_name;
	}
	
	@XmlElement(name="club_id")
	public Integer getClub_id() {
		return this.club_id;
	}
	   
	@XmlElement(name="club_name")
	public String getClub_name() {
		return this.club_name;
	}
}
