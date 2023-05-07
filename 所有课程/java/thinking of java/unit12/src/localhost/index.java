package localhost;
import java.util.logging.*;
import java.util.*;
import java.io.*;

import com.sun.istack.internal.logging.Logger;
public class index {
	class e extends Exception{
		private static Logger logger = Logger.getLogger("LoggingException");
		void f(){
			StringWriter trace = new StringWriter();
			printStackTrace(new PrintWriter(trace));
			logger.severe(trace.toString());
		}
	}
	static public void main(String []args){
		try{ 
			throw new index().new e();
		}catch(e e){
			System.err.println("caught"+e);
		}
	}
}
