const flag:Boolean = true;

const App = function ():Object {
  return (
      <section>
        <span>{flag?"flag是true":"flag是false"}</span>
      </section>
  );
}

export default App;
