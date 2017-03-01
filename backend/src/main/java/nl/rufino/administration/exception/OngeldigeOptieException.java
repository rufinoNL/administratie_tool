package nl.rufino.administration.exception;

public class OngeldigeOptieException extends RuntimeException {
	private static final long serialVersionUID = -5670051250521361692L;

	public OngeldigeOptieException(){}
	
	public OngeldigeOptieException(String message){
		super(message);
	}

}
