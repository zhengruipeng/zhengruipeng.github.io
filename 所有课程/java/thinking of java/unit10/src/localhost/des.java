package localhost;

public class des {
	public Content content(){
		return new Content(){
			private int i=1;
			public int valued(){return i;}
		};
	}
	static public void main(String[] args){
		des d = new des();
		Content c = d.content();
	}
	
}
