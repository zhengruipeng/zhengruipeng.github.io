package localhost;

public class this_keyword {
	static class Leaf{
		int i = 0;
		Leaf create(){
			this.i++;
			return this;
		}
		int printf(){
			return this.i;
		}
	}
	static public void main(String[] args){
		Leaf leaf = new Leaf();
		System.out.print(leaf.create().create().create().printf());
	}
}
