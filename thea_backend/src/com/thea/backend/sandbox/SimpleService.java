package com.thea.backend.sandbox;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;

@Path("test")
public class SimpleService {
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public User simpleGet() {
        return new User();
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("{id}")
    public String advancedGet(@PathParam("id") Integer id) {
        return "This is a GET, together with a parameter: " + Integer.toString(id);
    }
}