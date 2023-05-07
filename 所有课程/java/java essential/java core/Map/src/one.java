import java.util.*;

public class one {
    static public void main(String[] args){
        Map map = new HashMap();
        map.put(123,"123");
        map.put(321,"321");
        map.put(true,new int[]{});
      /*  Set keySet = map.keySet();
        keySet.forEach(key -> {
            System.out.println(key+"--"+map.get(key));
        });
        Iterator iter = keySet.iterator();
        iter.forEachRemaining(key -> {
            System.out.println(key+"--"+map.get(key));
        });
        while(iter.hasNext()){
            Object key = iter.next();
            System.out.println(key+"--"+map.get(key));
        }*/
        Set entrySet = map.entrySet();
     /*   entrySet.forEach(entry -> {
            Map.Entry mentry = (Map.Entry)entry;
            Object key = mentry.getKey();
            Object value = mentry.getValue();

            System.out.println(key+"--"+value);
        });*/
        Iterator iter2 = entrySet.iterator();
        while(iter2.hasNext()){
            Map.Entry entry = (Map.Entry)iter2.next();
            System.out.println(entry);
        }

        map.forEach((key,value) -> {
            System.out.println(key+"---"+value);
        });
    }
}
