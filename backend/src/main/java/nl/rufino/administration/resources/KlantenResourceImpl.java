package nl.rufino.administration.resources;

import javax.ws.rs.core.Response;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import nl.rufino.administration.dao.KlantenDao;

public class KlantenResourceImpl implements KlantenResource {
	private static final Logger LOG = LoggerFactory.getLogger(KlantenResourceImpl.class);
	private KlantenDao klantenDao;

	public KlantenResourceImpl() {
		klantenDao = new KlantenDao();
		LOG.info(getClass().getName() + " geinitialiseerd");
	}
	
	@Override
	public Response importeer(String json) {
		klantenDao.importeerKlant(json);
			
		return Response.ok().build();
	}

}
