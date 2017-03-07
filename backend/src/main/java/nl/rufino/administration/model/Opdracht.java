package nl.rufino.administration.model;

import org.mongodb.morphia.annotations.Embedded;
import org.mongodb.morphia.annotations.Property;

public class Opdracht {
	@Property
	private String bedrijfsnaam;
	@Embedded
	private Adres adres;
	@Property
	private Double tarief;

	public Adres getAdres() {
		return adres;
	}

	public void setAdres(Adres adres) {
		this.adres = adres;
	}

	public Double getTarief() {
		return tarief;
	}

	public void setTarief(Double tarief) {
		this.tarief = tarief;
	}

	public String getBedrijfsnaam() {
		return bedrijfsnaam;
	}

	public void setBedrijfsnaam(String bedrijfsnaam) {
		this.bedrijfsnaam = bedrijfsnaam;
	}
}
