import java.util.Collection;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;

public class two {
    static public void main(String[] args){
        Map map = new HashMap();
        map.put(2,"2");
        map.put(1,"1");
        map.put(3,"3");

        Collection value = map.values();
        value.forEach(v -> {
            System.out.println(v);
        });
    }
}
