import java.util.Arrays;

public class one {
    static int divide(int x,int y){
        return x/y;
    }
    static public void main(String[] args){
        try{
            divide(1,0);
        }catch(ArithmeticException e){
            System.out.println("ArithmeticException: "+e.getMessage());
        }catch(RuntimeException e){
            System.out.println("RuntimeException: "+e.getMessage());
        }catch (Exception e){
            System.out.println("Exception: " + e.getMessage());
        }finally {
            System.out.println("end");
        }
    }
}
