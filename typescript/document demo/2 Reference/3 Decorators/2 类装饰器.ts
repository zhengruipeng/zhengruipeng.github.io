function reportableClassDecorator<T extends { new(...args: any[]): {} }>(constructor: T) {
    console.log(constructor)
    return class extends constructor {
        reportingURL = "http://www...";
    };
}

@reportableClassDecorator
class BugReport {
    type = "report";
    title: string;

    constructor(t: string) {
        this.title = t;
    }
}

type Reportable = BugReport & { reportingURL: string };
const bug: Reportable = (new BugReport("Needs dark mode")) as Reportable;
console.log(bug.title); // Prints "Needs dark mode"
console.log(bug.type); // Prints "report"
console.log(bug.reportingURL);

// Note that the decorator _does not_ change the TypeScript type
// and so the new property `reportingURL` is not known
// to the type system:
// bug.reportingURL;
// Property 'reportingURL' does not exist on type 'BugReport'.