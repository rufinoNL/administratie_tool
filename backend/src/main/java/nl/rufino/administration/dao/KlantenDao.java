package nl.rufino.administration.dao;

import java.io.IOException;

import org.mongodb.morphia.Datastore;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import nl.rufino.administration.exception.DataOpslagException;
import nl.rufino.administration.model.Klant;

public class KlantenDao{
	
	private Datastore datastore = MongoDBConnector.getDatastore();
	
	public void importeerKlant(String json) throws DataOpslagException{
		ObjectMapper mapper = new ObjectMapper();
		mapper.enableDefaultTyping(ObjectMapper.DefaultTyping.NON_CONCRETE_AND_ARRAYS);
		try {
			Klant klant = mapper.readValue(json, Klant.class);
			datastore.save(klant);
		} catch (JsonParseException e) {
			e.printStackTrace();
		} catch (JsonMappingException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
}
