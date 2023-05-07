import java.io.IOException;
public class Runtime_getRuntime{
    public static void main(String[] args) {
        Runtime r = Runtime.getRuntime();
        try {
            r.exec("notepad.exe");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}


