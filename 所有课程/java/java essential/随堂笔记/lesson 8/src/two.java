public class two {
    public static int makeDivide(int a,int b) throws Exception {
        if(b==0)throw new ArithmeticException("/ by zero");
        if(a<0&&b<0)throw new Exception("error ");
        return 0;
    }
    public static void main(String[] args) throws Exception {
        int a = makeDivide(1,1);
        try {
            int b = makeDivide(1, 0);
            int c = makeDivide(-1, -1);
        }catch (ArithmeticException e){
            System.out.println("ArithmeticException: "+e.getMessage());
        }catch (Exception e){
            System.out.println("Exception: "+e.getMessage());
        }
    }
}
