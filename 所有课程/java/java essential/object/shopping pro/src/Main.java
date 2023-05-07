public class Main {
    static public void main(String[] args){
        Market market1 = new Market("家乐福");
        market1.setProductArr(
                new Product[]{
                        new Product("偶像大师周边"),
                        new Product("idoly pride周边")
                });

        Person person1 = new Person("miki");
        Product pro1 = person1.shopping(market1,"偶像大师周边");
        if(pro1 == null){
            System.out.println("超市没货");

            return ;
        }
        System.out.println(pro1.getName());

    }
}
