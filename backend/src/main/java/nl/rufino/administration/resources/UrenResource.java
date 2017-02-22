package nl.rufino.administration.resources;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("/urenresource")
public interface UrenResource {
	
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	Response leeg();

	@GET
	@Path("/{klantnaam}")
	@Produces(MediaType.APPLICATION_JSON)
	Response haalUrenOpVanKlant(@PathParam("klantnaam") String klantnaam);
}
