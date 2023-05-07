import java.util.TreeMap;

public class one {
    static public void main(String[] args){
        TreeMap<Student,String> map = new TreeMap<Student,String>();
        Student s1 = new Student(1,"1");
        Student s2 = new Student(2,"2");
        Student s3 = new Student(3,"3");
        map.put(s1,"1");
        map.put(s2,"2");
        map.put(s3,"3");
        System.out.println(map);
    }
}
