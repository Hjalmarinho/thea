package com.thea.backend.production.services;

import java.util.ArrayList;
import java.util.List;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import com.thea.backend.production.models.Club;

@Path("clubs")
public class ClubService {
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public List<Club> getClubs() {
		List<Club> clubs = new ArrayList<Club>();

		clubs.add(new Club(1, "NTNUI"));
		clubs.add(new Club(2, "TSI"));
		clubs.add(new Club(3, "BI Bergen studentidrettslag"));

		return clubs;
	}
}
