import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Properties;

public class two {
    static public void main(String []args) throws IOException {
        Properties pps = new Properties();
        pps.load(new FileInputStream("test.txt"));
        pps.forEach((k, v) -> System.out.println(k + "=" + v));
        FileOutputStream out = new FileOutputStream("test.txt");
        pps.setProperty("charset", "UTF-8");
        pps.store(out, "新增charset编码");

    }
}
