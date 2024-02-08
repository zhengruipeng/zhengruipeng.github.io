import java.io.File;

public class FolderCreator {
    public static void main(String[] args) {
        // 数组包含要创建的文件夹的名称
        String[] folderNames = {
                "花吻在上1.png",
                "花吻在上10 甜蜜成熟的融化之吻.png",
                "花吻在上11 莉莉·白金！.png",
                "花吻在上12 米卡艾尔的少女们.png",
                "花吻在上13 画室的恋人们.png",
                "花吻在上14 天使的憧憬.png",
                "花吻在上15 天使们的春恋.png",
                "花吻在上16 天使们的约定.png",
                "花吻在上17 天使们的约定.png",
                "花吻在上18 新世代.png",
                "花吻在上19 新世代.png",
                "花吻在上2 我的王子大人.png",
                "花吻在上20 最初相遇之日.png",
                "花吻在上3 恋人的羁绊.png",
                "花吻在上4 珍贵的相片.png",
                "花吻在上5 喜欢你的幸福.png",
                "花吻在上6 呢喃的双唇.png",
                "花吻在上7 甜蜜相思的融化之吻.png",
                "花吻在上8 天使的吻痕.png",
                "花吻在上9 花瓣.png"
        };

        // 指定文件夹所在的父文件夹路径
        String parentFolderPath = "J:\\所有新的游戏\\ふぐり屋\\花吻在上";

        // 创建父文件夹对象
        File parentFolder = new File(parentFolderPath);

        // 检查父文件夹是否存在
        if (parentFolder.exists() && parentFolder.isDirectory()) {
            // 遍历文件夹名称数组
            for (String folderName : folderNames) {
                // 创建文件夹路径
                String folderPath = parentFolderPath + File.separator + folderName;

                // 创建文件夹对象
                File folder = new File(folderPath);

                // 检查文件夹是否已存在
                if (!folder.exists()) {
                    // 创建文件夹
                    boolean created = folder.mkdirs();

                    if (created) {
                        System.out.println("文件夹 " + folderName + " 创建成功。");
                    } else {
                        System.out.println("文件夹 " + folderName + " 创建失败。");
                    }
                } else {
                    System.out.println("文件夹 " + folderName + " 已存在。");
                }
            }
        } else {
            System.out.println("指定的父文件夹路径不是一个有效的文件夹。");
        }
    }
}