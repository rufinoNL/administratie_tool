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
	public Response haalUrenOpVanKlant(String klantnaam) {
		List<Uren> haalUrenOpVanKlant = urenDao.haalUrenOpVanKlant(klantnaam);
		
		return Response.ok().entity(haalUrenOpVanKlant).build();
	}

	@Override
	public Response leeg() {
		return Response.ok().build();
	}

	@Override
	public Response urenBinnenPeriode(String vanaf, String totenmet) {
		List<Uren> urenBinnenPeriode = urenDao.urenBinnenPeriode(vanaf, totenmet);
		
		return Response.ok().entity(urenBinnenPeriode).build();
	}

}
