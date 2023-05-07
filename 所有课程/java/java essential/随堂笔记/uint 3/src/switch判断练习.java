import java.util.Date;

public class switch判断练习 {
    static public void main(String[] args){
        Date date = new Date();
        int month = date.getMonth()+1;
        switch (month){
            case 1:
            case 2:
            case 3:
                System.out.println("冬季");
                break;
            case 4:
            case 5:
            case 6:
                System.out.println("春季");
                break;
            case 7:
            case 8:
            case 9:
                System.out.println("夏季");
                break;
            case 10:
            case 11:
            case 12:
                System.out.println("秋季");
                break;
        }
        System.out.println(month);
    }
}
