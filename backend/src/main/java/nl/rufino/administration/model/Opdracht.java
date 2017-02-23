package nl.rufino.administration.model;

import org.mongodb.morphia.annotations.Property;

public class Opdracht {
	@Property("klant")
	private String klant;
	@Property("straat")
	private String straat;
	@Property("huisnummer")
	private int huisnummer;
	@Property("huisnummertoev")
	private String huisnummerToev;
	@Property("postcode")
	private String postcode;
	@Property("plaats")
	private String plaats;

	public String getKlant() {
		return klant;
	}

	public void setKlant(String klant) {
		this.klant = klant;
	}

	public String getStraat() {
		return straat;
	}

	public void setStraat(String straat) {
		this.straat = straat;
	}

	public int getHuisnummer() {
		return huisnummer;
	}

	public void setHuisnummer(int huisnummer) {
		this.huisnummer = huisnummer;
	}

	public String getHuisnummerToev() {
		return huisnummerToev;
	}

	public void setHuisnummerToev(String huisnummerToev) {
		this.huisnummerToev = huisnummerToev;
	}

	public String getPostcode() {
		return postcode;
	}

	public void setPostcode(String postcode) {
		this.postcode = postcode;
	}

	public String getPlaats() {
		return plaats;
	}

	public void setPlaats(String plaats) {
		this.plaats = plaats;
	}
}
