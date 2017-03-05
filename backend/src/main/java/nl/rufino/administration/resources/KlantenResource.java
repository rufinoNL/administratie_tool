package nl.rufino.administration.resources;

import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("/klantenresource")
public interface KlantenResource {

	@POST
	@Produces(MediaType.APPLICATION_JSON)
	public Response importeer(String json);
	
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public Response haalAlleKlantenOp();
}
