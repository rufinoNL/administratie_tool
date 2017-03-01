package nl.rufino.administration.exception;

public class DataOpslagException extends RuntimeException {

	private static final long serialVersionUID = -5617542739910777738L;

	public DataOpslagException() {}
	
	public DataOpslagException(String message) {
		super(message);
	}
}
