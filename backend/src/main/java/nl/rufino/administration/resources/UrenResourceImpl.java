package nl.rufino.administration.resources;

import java.util.List;

import javax.ws.rs.BadRequestException;
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
	public Response urenBinnenPeriode(String vanaf, String totenmet) {
		String checkedVanaf = checkDatum(vanaf);
		String checkedTotenmet= checkDatum(totenmet);
		
		List<Uren> urenBinnenPeriode = urenDao.urenBinnenPeriode(checkedVanaf, checkedTotenmet);
		
		return Response.ok().entity(urenBinnenPeriode).build();
	}

	private String checkDatum(String datum) throws BadRequestException{
		String[] splitDatum = datum.split("-");
		
		if(splitDatum.length!=3 || datum.length() < 8 || datum.length() > 10){
			throw new BadRequestException("Datum behoort uit drie delen te bestaan in de vorm: yyyy-(M)M-(d)d. Min lengte = 8, max lengte = 10.");
		}

		for(int i = 1;i<3;i++){
			if(splitDatum[i].length()>0 && splitDatum[i].length()<2){
				splitDatum[i] = "0" + splitDatum[i];
			}
		}
		return splitDatum[0] + "-" + splitDatum[1] + "-" + splitDatum[2];
	}

}
