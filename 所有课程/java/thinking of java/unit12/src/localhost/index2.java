package localhost;
import java.util.*;

import com.sun.istack.internal.logging.Logger;
public class index2 {
	static void log(Exception e){
		e.printStackTrace(System.out);
	}
	static class a{
		public void error(String s) throws Exception{
			throw new Exception(s);
		}
	}
	public static void main(String []args){
		try{
			new a().error("s");
		}catch(Exception e){
			log(e);
		}
	}
}
