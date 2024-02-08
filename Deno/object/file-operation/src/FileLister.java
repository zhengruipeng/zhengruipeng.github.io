import java.io.File;

public class FileLister {
    public static void main(String[] args) {
        // 指定文件夹路径
        String folderPath = "E:\\Pictures\\galgame cover\\最新\\花吻在上";

        // 创建文件夹对象
        File folder = new File(folderPath);

        // 检查文件夹是否存在
        if (folder.exists() && folder.isDirectory()) {
            // 获取文件夹中的所有文件
            File[] files = folder.listFiles();

            if (files != null) {
                // 遍历文件列表并输出文件名
                for (File file : files) {
                    if (file.isFile()) {
                        System.out.println(file.getName());
                    }
                }
            } else {
                System.out.println("文件夹为空或无法访问。");
            }
        } else {
            System.out.println("指定的路径不是一个有效的文件夹。");
        }
    }
}