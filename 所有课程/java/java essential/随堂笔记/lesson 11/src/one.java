import java.util.HashSet;

class Student{
    public int id;
    public String name;
    public Student(int id,String name){
        this.id = id;
        this.name = name;
    }
    public String toString(){
        return this.id+" : "+this.name;
    }
    public int hashCode(){
        return this.name.hashCode();
    }
    public boolean equals(Object that){
        if(!(that instanceof Student))return false;
        Student obj = (Student)that;
        if(this.id == obj.id){return true;}
        return false;
    }
}
public class one {
    public static void main(String []args){
        HashSet set = new HashSet();
        Student stu1 = new Student(1,"123");
        set.add(stu1);
        Student stu2 = new Student(2,"321");
        set.add(stu2);
        Student stu3 = new Student(3,"123");
        set.add(stu3);
        System.out.println(set);


    }
}
