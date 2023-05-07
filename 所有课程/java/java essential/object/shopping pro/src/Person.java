public class Person {
    private String __name__;
    public String getName(){
        return this.__name__;
    }
    public String setName(String str){
        return this.__name__ = str;
    }
    public  Product shopping(Market market,String name){
        return market.sell(name);
    }
    public Person(String name){
        this.setName(name);

    }
}
