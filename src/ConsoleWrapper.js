class ConsoleWrapper{
    constructor(debug = false){
        this.name = 'Console wrapper!';
    }
    speak(){
        debugger;
        console.log("Hello, I am ", this); //this == the object instance.
    }
}

export default ConsoleWrapper; //set what can be imported from this file
