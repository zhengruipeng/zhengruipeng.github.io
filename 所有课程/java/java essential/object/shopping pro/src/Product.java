public class Product {
    private String __name__;
    public String getName(){
        return this.__name__;
    }
    public String setName(String str){
        return this.__name__ = str;
    }
    public Product(String name){
        this.setName(name);

    }
}
