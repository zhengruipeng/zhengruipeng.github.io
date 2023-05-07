import java.util.Collection;
import java.util.LinkedHashMap;

public class one {
    static public void main(String[] args){
        LinkedHashMap map = new LinkedHashMap();
        map.put(2,"2");
        map.put(1,"1");
        map.put(3,"3");

        Collection value = map.values();
        value.forEach(v -> {
            System.out.println(v);
        });
    }
}
