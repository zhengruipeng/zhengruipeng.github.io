public class Market {
    private String __marketName__;
    private Product[] __prodectArr__;
    public Market(){}
    public Market(String name){
        this.setMarketName(name);
    }
    public Market(String name,Product[] products){
        this.setMarketName(name);
        this.setProductArr(products);
    }
    public String getMarketName(){
        return this.__marketName__;
    }
    public String setMarketName(String str){
        return this.__marketName__ = str;
    }
    public Product[] getProductArr(){
        return this.__prodectArr__;
    }
    public Product[] setProductArr(Product[] arr){
        return this.__prodectArr__ = arr;
    }
    public Product sell(String name){
        for(int i = 0;i<this.__prodectArr__.length;i++){
            if(this.__prodectArr__[i].getName() == name){
                return this.__prodectArr__[i];
            }
        }
        return null;
    }
}
