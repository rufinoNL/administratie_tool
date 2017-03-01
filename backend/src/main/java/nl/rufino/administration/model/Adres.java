package nl.rufino.administration.model;

import org.mongodb.morphia.annotations.Property;

public class Adres {
	@Property
	private String straat;
	@Property
	private Integer huisnummer;
	@Property
	private String huisnummertoev;
	@Property
	private String postcode;
	@Property
	private String plaats;

	public String getStraat() {
		return straat;
	}

	public void setStraat(String straat) {
		this.straat = straat;
	}

	public Integer getHuisnummer() {
		return huisnummer;
	}

	public void setHuisnummer(Integer huisnummer) {
		this.huisnummer = huisnummer;
	}

	public String getHuisnummertoev() {
		return huisnummertoev;
	}

	public void setHuisnummertoev(String huisnummertoev) {
		this.huisnummertoev = huisnummertoev;
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
