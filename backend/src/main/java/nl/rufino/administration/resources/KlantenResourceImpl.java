package nl.rufino.administration.resources;

import java.util.List;

import javax.ws.rs.core.Response;

import nl.rufino.administration.dao.KlantenDao;
import nl.rufino.administration.model.Klant;

public class KlantenResourceImpl implements KlantenResource {
	private KlantenDao klantenDao;

	public KlantenResourceImpl() {
		klantenDao = new KlantenDao();
	}
	
	@Override
	public Response importeer(String json) {
		klantenDao.importeerKlant(json);
			
		return Response.ok().build();
	}

	@Override
	public Response haalAlleKlantenOp() {
		List<Klant> klanten = klantenDao.haalAlleKlantenOp();
		
		return Response.ok().entity(klanten).build();
	}

}
