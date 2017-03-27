package nl.rufino.administration.dao;

import java.io.IOException;

import org.mongodb.morphia.Datastore;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import nl.rufino.administration.exception.DataOpslagException;
import nl.rufino.administration.model.Klant;

public class KlantenDao{
	private Logger logger = LoggerFactory.getLogger(KlantenDao.class);
	private Datastore datastore = MongoDBConnector.getDatastore();
	
	public void importeerKlant(String json) throws DataOpslagException{
		ObjectMapper mapper = new ObjectMapper();
		mapper.enableDefaultTyping(ObjectMapper.DefaultTyping.NON_CONCRETE_AND_ARRAYS);
		try {
			Klant klant = mapper.readValue(json, Klant.class);
			System.out.println(klant);
			datastore.save(klant);
		} catch (JsonParseException e) {
			logger.error("Fout bij het parsen",e);
		} catch (JsonMappingException e) {
			logger.error("Fout bij het mappen van JSON",e);
		} catch (IOException e) {
			logger.error("Fout bij het opslaan",e);
		}
	}
}
