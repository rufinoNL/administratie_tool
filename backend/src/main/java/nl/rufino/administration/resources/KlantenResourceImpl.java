package nl.rufino.administration.resources;

import javax.ws.rs.core.Response;

import nl.rufino.administration.dao.KlantenDao;

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

}
