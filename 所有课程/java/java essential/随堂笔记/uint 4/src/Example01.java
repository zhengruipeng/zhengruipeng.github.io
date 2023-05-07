public class Example01 {
    static public void main(String[] args){
        Student s1 = new Student("张三",19);
        s1.speak();
        Student s2 = new Student("李四",20);
        s2.speak();
        Student s3 = s2;
        s3.speak();
    }
}
