package nl.rufino.administration.dao;

import org.mongodb.morphia.Datastore;
import org.mongodb.morphia.Morphia;

import com.mongodb.MongoClient;

public class MongoDBConnector {
	private static final String ADMINISTRATION_DB = "administration";
	private static Datastore instance;
	
	private MongoDBConnector() {
		//singleton class
	}
	
	public static Datastore getDatastore() {
		if(instance == null){
			Morphia morphia = new Morphia();
			instance = morphia.createDatastore(new MongoClient(), ADMINISTRATION_DB);
			System.out.println("Datastore geinitialiseerd..");
		}
		return instance;
	}

}
