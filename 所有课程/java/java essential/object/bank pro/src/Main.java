public class Main {
    static  public void main(String[] args){
        Bank.bankName = "765 pro";
        Bank.welcome();
        Bank bank = new Bank("miki","mikimiki",100);
        bank.deposit(50);
        bank.withdraw("123",100);
        bank.withdraw("mikimiki",100);
        bank.withdraw("mikimiki",100);
        bank = null;
        Bank.bye();
    }
}
