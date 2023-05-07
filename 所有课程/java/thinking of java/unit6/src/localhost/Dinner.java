package localhost;
class Sundae{
	private Sundae(){};
	static String f(){
		return "123";
	}
}
class Dinner {
	static public void main(String[] args){
		/*Cookie cookie = new Cookie();
		cookie.f();
		Pie pie = new Pie();
		pie.f();*/
		String x = Sundae.f();
		System.out.print(x);
		Cookie cookie = new Cookie();
		cookie.f();
	}
}
