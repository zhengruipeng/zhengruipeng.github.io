const App = function (){
    return (
        <section>
            <p>typeof :{typeof <div></div>}</p>
            <p>constructor:{(<div></div>).constructor}</p>
            <p>Object.prototype.toString.call:{Object.prototype.toString.call(<div></div>)}</p>
            <p>tagName:{(<div></div>).tagName}</p>
        </section>
    )
};

export default App;
