public class three {
    static public void main(String[] args){
        int[] arr = new int[]{1,5,8,10,20,25,67};
        int max = arr[0];
        for(int i = 0;i<arr.length;i++){
            if(max<arr[i])max = arr[i];
        }
        System.out.println(max);

    }
}
