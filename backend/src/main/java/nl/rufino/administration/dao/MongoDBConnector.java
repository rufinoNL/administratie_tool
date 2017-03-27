package nl.rufino.administration.dao;

import org.mongodb.morphia.Datastore;
import org.mongodb.morphia.Morphia;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.mongodb.MongoClient;

public class MongoDBConnector {
	private static final Logger LOG = LoggerFactory.getLogger(MongoDBConnector.class);
	private static final String ADMINISTRATION_DB = "administration";
	private static Datastore instance;
	
	private MongoDBConnector() {
		//singleton class
	}
	
	public static Datastore getDatastore() {
		if(instance == null){
			Morphia morphia = new Morphia();
			instance = morphia.createDatastore(new MongoClient(), ADMINISTRATION_DB);
			LOG.info("Datastore geinitialiseerd");
		}
		return instance;
	}

}
