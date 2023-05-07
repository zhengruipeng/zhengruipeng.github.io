public class 连续if_else练习 {
    public static void main(String[] args){
        int score = 70;
        if(score>90){
            System.out.println("优秀");
        }else if(score>80){
            System.out.println("良好");
        }else if(score>70){
            System.out.println("中等");
        }else if(score>60){
            System.out.println("及格");
        }else if(score<60){
            System.out.println("不及格");
        }
    }
}
