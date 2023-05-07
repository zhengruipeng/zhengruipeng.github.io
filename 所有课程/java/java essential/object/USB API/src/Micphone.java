public class Micphone implements USB{
    @Override
    public void turnOn() {
        System.out.println("Micphone turn on");
    }

    @Override
    public void turnOff() {
        System.out.println("Micphone turn off");
    }
}
