public class Mouse implements USB {
    @Override
    public void turnOff() {
        System.out.println("mouse turn off");
    }

    @Override
    public void turnOn() {
        System.out.println("mouse turn on");
    }
}
