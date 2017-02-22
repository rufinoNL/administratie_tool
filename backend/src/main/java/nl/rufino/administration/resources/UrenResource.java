package nl.rufino.administration.resources;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("/")
public interface UrenResource {
	
	@GET
	@Path("klant")
	@Produces(MediaType.APPLICATION_JSON)
	Response haalUrenOpVanKlant(@QueryParam("naam") String naam);
}
