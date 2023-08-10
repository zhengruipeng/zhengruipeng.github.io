function classDecorator(target: any) {
    console.log(target)
}

@classDecorator
class Test extends Object {
    public foo(): void {

    }
}
export {Test}