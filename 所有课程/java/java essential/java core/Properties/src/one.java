import java.util.Properties;

public class one {
    static public void main(String []args){
        Properties properties = new Properties();
        properties.setProperty("1","123");
        System.out.println(properties.getProperty("1"));
    }
}
