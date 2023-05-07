class CustomException extends Exception{
    public String message;
    public CustomException(){
        super();
    }
    public CustomException(String message){
        super();
        this.message = message;
    }
}
public class three {
    public static void main(String[] args) throws Exception{
        try{
            throw new CustomException("error");
        }catch (CustomException e){
            System.out.println(e.message);
        }
    }
}
