import java.util.List;
public class index {
    static public Object[] arrayPush(Object[] arr,Object ele){
        for(int i = arr.length-1;i>=0;i--){
//            System.out.println(arr[i]);

            if(arr[i] != null){
                try {
                    arr[i + 1] = ele;
                    return arr;
                }catch (Exception e){
                    arr[i] = ele;
                    return arr;
                }
            }else if(i == 0){
                arr[i] = ele;
                return arr;
            }
        }
        return arr;
    }
    static public void main(String[] args){
        USB[] usbDevices = new USB[4];
        Mouse mouse1 = new Mouse();
        Keyboard key = new Keyboard();
        Micphone mic = new Micphone();
        arrayPush(usbDevices,mouse1);
        arrayPush(usbDevices,key);
        arrayPush(usbDevices,mic);
        for(int i = 0;i<usbDevices.length;i++){
            if(usbDevices[i] == null)continue;
            System.out.println("第"+i+"设备");
            usbDevices[i].turnOn();
            usbDevices[i].turnOff();
        }
        usbDevices[1] = null;
        arrayPush(usbDevices,key);

        for(int i = 0;i<usbDevices.length;i++){
            if(usbDevices[i] == null)continue;
            System.out.println("第"+i+"设备");
            usbDevices[i].turnOn();
            usbDevices[i].turnOff();
        }
    }
}
