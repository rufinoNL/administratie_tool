package nl.rufino.administration.model;

import java.util.List;

import org.mongodb.morphia.annotations.Embedded;
import org.mongodb.morphia.annotations.Property;

public class Opdracht {
	@Embedded
	private Klant klant;
	@Embedded
	private Adres adres;
	@Property
	private List<Klant> opdrachten;
	@Property
	private Double tarief;

	public Klant getKlant() {
		return klant;
	}

	public void setKlant(Klant klant) {
		this.klant = klant;
	}

	public Adres getAdres() {
		return adres;
	}

	public void setAdres(Adres adres) {
		this.adres = adres;
	}

	public List<Klant> getOpdrachten() {
		return opdrachten;
	}

	public void setOpdrachten(List<Klant> opdrachten) {
		this.opdrachten = opdrachten;
	}

	public Double getTarief() {
		return tarief;
	}

	public void setTarief(Double tarief) {
		this.tarief = tarief;
	}

	@Override
	public String toString() {
		return "Opdracht [klant=" + klant + ", adres=" + adres + ", opdrachten=" + opdrachten + ", tarief=" + tarief
				+ "]";
	}
}
