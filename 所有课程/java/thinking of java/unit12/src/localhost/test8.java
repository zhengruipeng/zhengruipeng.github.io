package localhost;
public class test8 {
	static void f() throws Exception{			//û��throws Exception �����޷�ͨ������
		throw new Exception();
	}
	public static void main(String []args){
		try{
			f();
		}catch(Exception e){
			System.out.print("success");
		}
	}
}
