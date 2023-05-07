public class Keyboard implements USB{
    @Override
    public void turnOn() {
        System.out.println("Keyboard turn on");
    }

    @Override
    public void turnOff() {
        System.out.println("Keyboard turn off");
    }
}
