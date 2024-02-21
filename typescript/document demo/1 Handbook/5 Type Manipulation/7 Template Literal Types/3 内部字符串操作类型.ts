// Uppercase<StringType>
type Greeting = "hello world"
type shoutyGreeting = Uppercase<Greeting>

type ASCIICacheKey<Str extends string> = `ID-${Uppercase<Str>}`
type MainID = ASCIICacheKey<'my_app'>;

//Lowercase<StringType>
type QuietGreeting = Lowercase<shoutyGreeting>

type GreetingCapitalize = Capitalize<QuietGreeting>;

type GreetingUncapitalize = Uncapitalize<shoutyGreeting>;
