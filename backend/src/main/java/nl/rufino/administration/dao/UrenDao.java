package nl.rufino.administration.dao;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import org.mongodb.morphia.Datastore;
import org.mongodb.morphia.Morphia;
import org.mongodb.morphia.query.FieldEnd;
import org.mongodb.morphia.query.Query;

import com.mongodb.MongoClient;

import nl.rufino.administration.model.Uren;

public class UrenDao {
	private static final String ADMINISTRATION_DB = "administration";
	private static Datastore datastore;

	public UrenDao(){
		init();
	}

	private void init() {
		if(datastore == null){
			Morphia morphia = new Morphia();
			datastore = morphia.createDatastore(new MongoClient(), ADMINISTRATION_DB);
			System.out.println("Datastore geinitialiseerd..");
		}
	}
	
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
