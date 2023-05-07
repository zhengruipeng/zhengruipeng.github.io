public class Bank {
    static  String bankName;
    private String __username__;
    private String __password__;
    private double __balance__;
    private double __turnover__;

    public Bank(String username,String password,double turnover){
        this.__username__ =username;
        this.__password__ =password;
        this.__turnover__ =turnover;
        this.__balance__ = turnover -10;
        System.out.println("create success:balance is: "+this.__balance__);
    }
    static String welcome(){
        System.out.println("welcome"+Bank.bankName);
        return "welcome"+Bank.bankName;
    }
    static String bye(){
        System.out.println("bye"+Bank.bankName);
        return "bye"+Bank.bankName;
    }
    public void deposit(double turnover){
        this.__balance__ += turnover;
        System.out.println("deposit success:balance is: "+this.__balance__);

    }
    public void withdraw(String password,double turnover){
        if(password != this.__password__){
            System.out.println("pwd error");
            return ;
        }
        if(turnover > this.__balance__){
            System.out.println("no balance ");
            return ;
        }
        this.__balance__ -= turnover;
        System.out.println("withdraw success:balance is: "+this.__balance__);

    }
}
