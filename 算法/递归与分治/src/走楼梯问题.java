public class 走楼梯问题 {
    public static int foo(int stage){
         if(stage<0)return 0;
         else if(stage==0)return 1;
         else{
             return foo(stage-1)+foo(stage-2);
         }
    }


    public static void main(String[] args){
        int stage = 3;

        System.out.println(foo(stage));
    }
}
