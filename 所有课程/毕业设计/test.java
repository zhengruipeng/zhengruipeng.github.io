import java.io.File;
import java.awt.Desktop;
import java.io.IOException;
import java.nio.file.DirectoryStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class test {
    public static void main(String[] args) {
        String folderPath = "J:\\美少女游戏\\asa project"; // 指定文件夹路径
        File folder = new File(folderPath);

        if (folder.exists() && folder.isDirectory()) {
            try {
                listFilesAndSubfolders(folder);
            } catch (IOException e) {
                System.out.println("无法遍历文件夹：" + e.getMessage());
            }
        } else {
            System.out.println("指定的路径不是有效的文件夹。");
        }
    }

    private static void listFilesAndSubfolders(File folder) throws IOException {
        Set<String> fileSet = new HashSet<>();
        try (Stream<Path> stream = Files.walk(Paths.get(folder.getAbsolutePath()))) {
            fileSet = stream
                    .filter(Files::isRegularFile)
                    .filter(file -> isCommonArchive(file.getFileName().toString()))
                    .map(Path::toString)
                    .collect(Collectors.toSet());
        }

        for (String filePath : fileSet) {
            openWithDefaultApp(new File(filePath));
        }
    }

    private static boolean isCommonArchive(String fileName) {
        // 检查文件名是否以常见压缩包后缀结尾
        return fileName.endsWith(".zip") || fileName.endsWith(".rar") ||
                fileName.endsWith(".7z") || fileName.endsWith(".01");
    }

    private static void openWithDefaultApp(File file) {
        try {
            Desktop.getDesktop().open(file);
            System.out.println("已打开：" + file.getName());
        } catch (Exception e) {
            System.out.println("无法打开：" + file.getName());
        }
    }
}
