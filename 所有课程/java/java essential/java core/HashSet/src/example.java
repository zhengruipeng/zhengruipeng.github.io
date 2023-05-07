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
        System.out.println(this.id+this.name.hashCode());
        return this.id+this.name.hashCode();
    }
    public boolean equals(Object that){
        if(!(that instanceof Student))return false;
        Student obj = (Student)that;
        if(obj.id == this.id && this.name == obj.name){return true;}
        return false;
    }
}

public class example {
    public static void main(String []args){
        HashSet set = new HashSet();
        Student stu1 = new Student(1,"123");
        set.add(stu1);
        Student stu2 = new Student(2,"321");
        set.add(stu2);
        Student stu3 = new Student(1,"123");
        set.add(stu3);
        System.out.println(set);


    }
}
