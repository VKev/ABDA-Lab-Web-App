package abda.hashtagservice.infrastructure.exception.def;

public class NotFoundException extends RuntimeException {
    public NotFoundException(String message) {
        super(message);
    }
    
}