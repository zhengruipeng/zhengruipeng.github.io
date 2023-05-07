public class six {
    static public void main(String[] args){
        int[][] arr = new int[][]{{11,12},{21,22,23},{31,32,33,34}};
        int a,b,c;
        a = b = c = 0;
        for(int i = 0;i<arr.length;i++){
            for(int j = 0;j<arr[i].length;j++){
                if(i == 0){
                    a+=arr[i][j];
                }else if(i == 1){
                    b+=arr[i][j];
                }else if(i == 2){
                    c+=arr[i][j];
                }
            }
        }
        int s = a +b+c;
        System.out.println("第一小组："+a);
        System.out.println("第2小组："+b);
        System.out.println("第3小组："+c);
        System.out.println("所有："+s);

    }
}
