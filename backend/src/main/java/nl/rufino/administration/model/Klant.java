package nl.rufino.administration.model;

import org.bson.types.ObjectId;
import org.mongodb.morphia.annotations.Embedded;
import org.mongodb.morphia.annotations.Entity;
import org.mongodb.morphia.annotations.Id;
import org.mongodb.morphia.annotations.Property;

@Entity("nl.rufino.administration.klant")
public class Klant {
	@Id
	private ObjectId _id;
	@Property
	private int klantnummer;
	@Property
	private String bedrijfsnaam;
	@Property
	private String contactpersoon;
	@Embedded
	private Adres adres;

	public ObjectId get_id() {
		return _id;
	}

	public int getKlantnummer() {
		return klantnummer;
	}

	public void setKlantnummer(int klantnummer) {
		this.klantnummer = klantnummer;
	}

	public String getBedrijfsnaam() {
		return bedrijfsnaam;
	}

	public void setBedrijfsnaam(String bedrijfsnaam) {
		this.bedrijfsnaam = bedrijfsnaam;
	}

	public Adres getAdres() {
		return adres;
	}

	public void setAdres(Adres adres) {
		this.adres = adres;
	}

	public String getContactpersoon() {
		return contactpersoon;
	}

	public void setContactpersoon(String contactpersoon) {
		this.contactpersoon = contactpersoon;
	}

	@Override
	public String toString() {
		return "Klant [_id=" + _id + ", klantnummer=" + klantnummer + ", bedrijfsnaam=" + bedrijfsnaam
				+ ", contactpersoon=" + contactpersoon + ", adres=" + adres + "]";
	}
}
