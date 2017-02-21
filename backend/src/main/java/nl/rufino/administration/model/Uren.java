package nl.rufino.administration.model;

import org.bson.types.ObjectId;
import org.mongodb.morphia.annotations.Entity;
import org.mongodb.morphia.annotations.Id;
import org.mongodb.morphia.annotations.Property;

@Entity("nl.rufino.administration.uren")
public class Uren {
	@Id
	private ObjectId _id;
	@Property("klant")
	private String klant;
	@Property("uren")
	private int uren;
	
	public int getUren() {
		return uren;
	}
	
	public void setUren(int uren) {
		this.uren = uren;
	}
	
	public String getKlant() {
		return klant;
	}
	
	public void setKlant(String klant) {
		this.klant = klant;
	}
	
	public ObjectId get_id() {
		return _id;
	}
	
	public void set_id(ObjectId _id) {
		this._id = _id;
	}
}
