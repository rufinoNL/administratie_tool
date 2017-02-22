package nl.rufino.administration.resources;

import java.util.List;

import javax.ws.rs.core.Response;

import nl.rufino.administration.dao.UrenDao;
import nl.rufino.administration.model.Uren;

public class UrenResourceImpl implements UrenResource{

	private UrenDao urenDao;
	
	public UrenResourceImpl() {
		urenDao = new UrenDao();
	}
	
	@Override
	public Response haalUrenOpVanKlant(String naam) {
		List<Uren> haalUrenOpVanKlant = urenDao.haalUrenOpVanKlant(naam);
		
		return Response.ok().entity(haalUrenOpVanKlant).build();
	}

}
