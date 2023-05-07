public class math方法1{
    public static void main(String[] args) {
        System.out.println("π的值是:"+Math.PI);
        System.out.println("自然对数的底数:"+Math.E);
        System.out.println("3的绝对值:"+Math.abs(3));
        System.out.println("27的立方根是:"+Math.cbrt(27));
        System.out.println("16的平方根是:"+Math.sqrt(16));
        System.out.println("4的平方是:"+Math.pow(4, 2));//4的2次方
        System.out.println("12.345使用ceil方法后的结果是:"+Math.ceil(12.345));
        System.out.println("-12.345使用floor方法后的结果是："
                +Math.floor(-12.345));
        for(int x=0; x<3 ;x++){
            System.out.println(Math.random());
        }
        for(int x=0; x<3 ;x++){
            System.out.println((int)(Math.random()*100+1));  //边界值 1 - 100
        }
    }
}
