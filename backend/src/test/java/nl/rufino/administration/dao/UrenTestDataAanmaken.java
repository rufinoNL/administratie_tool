package nl.rufino.administration.dao;

import java.util.Random;

import org.junit.Before;
import org.junit.Test;
import org.mongodb.morphia.Datastore;

import nl.rufino.administration.model.Adres;
import nl.rufino.administration.model.Klant;
import nl.rufino.administration.model.Opdracht;
import nl.rufino.administration.model.Uren;

public class UrenTestDataAanmaken {
	private static final Datastore ds = MongoDBConnector.getDatastore();
	private Uren uren;
	
	@Before
	public void setup(){
		uren = new Uren();
		//2012-04-23T18:25:40.000Z
		Klant klant = new Klant();
		klant.setAdres(new Adres());
		klant.setBedrijfsnaam("Test");
		uren.setKlant(klant);
		Opdracht opdracht = new Opdracht();
		opdracht.setTarief(52.5);
		
		uren.setOpdracht(opdracht);
	}
	
	@Test
	public void when_dataWrittenToUrenCollection_then_urenSaved() {
		for(int i = 10;i<31;i++){
			Random r = new Random(9);
			uren.setDatum("201"+r.nextInt(9)+ "-04-"+ i + "T18:25:40.000Z");
			uren.setUren(r.nextInt(8)+1);
			ds.save(uren);
		}
	}

}
