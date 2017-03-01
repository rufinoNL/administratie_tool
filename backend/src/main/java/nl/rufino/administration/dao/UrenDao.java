package nl.rufino.administration.dao;

import java.io.IOException;
import java.util.List;

import org.mongodb.morphia.Datastore;
import org.mongodb.morphia.query.Query;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import nl.rufino.administration.model.Uren;

public class UrenDao {
	private Datastore datastore = MongoDBConnector.getDatastore();
	
	public List<Uren> haalUrenOpVanKlant(String naam) {
		datastore.ensureIndexes();
		List<Uren> queryResult = datastore.createQuery(Uren.class).field("klant").contains(naam).asList();		
		return queryResult;
	}
	
	public List<Uren> urenBinnenPeriode(String vanaf, String totenmet){
		List<Uren> queryResult = null;
		Query<Uren> query = datastore.createQuery(Uren.class);
		query.field("datum").greaterThanOrEq(vanaf);
		query.field("datum").lessThanOrEq(totenmet);
		queryResult = query.asList();
		
		return queryResult;
	}

	public void urenInvoeren(String json) {
		ObjectMapper mapper = new ObjectMapper();
		mapper.enableDefaultTyping(ObjectMapper.DefaultTyping.NON_CONCRETE_AND_ARRAYS);
		try {
			Uren uren = mapper.readValue(json, Uren.class);
			datastore.save(uren);
		} catch (JsonParseException e) {
			e.printStackTrace();
		} catch (JsonMappingException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
}
