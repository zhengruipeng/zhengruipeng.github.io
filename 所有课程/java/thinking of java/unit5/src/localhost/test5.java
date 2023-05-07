package localhost;

public class test5 {
	static class Dog{
		short i;
		Dog(){
			this.i = 1;
		}
		void set(short s){
			this.i = s;
		}
		void bark(){
			if(this.i == 1)System.out.print("barking");
			else if(this.i == 2)System.out.print("howling");
			
			
		}
	}
	static public void main(String[] args){
		Dog dog = new Dog();
		dog.set((short)2);
		dog.bark();
	}
}
