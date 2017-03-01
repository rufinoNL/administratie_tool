package nl.rufino.administration.resources;

import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("/urenresource")
public interface UrenResource {

	@GET
	@Path("/{klantnaam}")
	@Produces(MediaType.APPLICATION_JSON)
	Response haalUrenOpVanKlant(@PathParam("klantnaam") String klantnaam);
	
	@GET
	@Path("/{vanaf}/{totenmet}")
	@Produces(MediaType.APPLICATION_JSON)
	Response urenBinnenPeriode(@PathParam("vanaf") String vanaf, @PathParam("totenmet") String totenmet);
	
	@POST
	@Path("/invoeren")
	@Produces(MediaType.APPLICATION_JSON)
	public Response invoeren(String json);
}
