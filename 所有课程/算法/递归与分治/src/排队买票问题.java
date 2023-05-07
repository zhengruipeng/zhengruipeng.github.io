public class 排队买票问题 {
    public static int f(int m , int n){
        if(m<n) return 0;
        else if(n==0)  return 1;
        else return f(m-1,n)+f(m,n-1);
    }
    public static void main(String[] args){
        System.out.println(f(20,10));
    }
}
