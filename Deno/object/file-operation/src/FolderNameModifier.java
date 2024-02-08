import java.io.File;

public class FolderNameModifier {
    public static void main(String[] args) {
        // 指定文件夹路径
        String folderPath = "J:\\所有新的游戏\\ふぐり屋\\花吻在上";

        // 创建文件夹对象
        File folder = new File(folderPath);

        // 检查文件夹是否存在
        if (folder.exists() && folder.isDirectory()) {
            // 获取文件夹中的所有文件夹
            File[] subFolders = folder.listFiles(File::isDirectory);

            if (subFolders != null) {
                // 遍历子文件夹并修改名称
                for (File subFolder : subFolders) {
                    String originalName = subFolder.getName();
                    String modifiedName = originalName.replace(".png", "");
                    File renamedFolder = new File(folderPath, modifiedName);

                    // 重命名文件夹
                    boolean renamed = subFolder.renameTo(renamedFolder);

                    if (renamed) {
                        System.out.println("文件夹 " + originalName + " 重命名为 " + modifiedName);
                    } else {
                        System.out.println("文件夹 " + originalName + " 重命名失败");
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