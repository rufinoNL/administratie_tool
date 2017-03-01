package nl.rufino.administration.dao;

import java.util.List;

import org.mongodb.morphia.Datastore;
import org.mongodb.morphia.query.Query;

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
}
