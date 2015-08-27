'use strict';

//var fs = require('fs');

import ConsoleWrapper from "../src/ConsoleWrapper.js";

// class ConsoleWrapper{
//     constructor(debug = false){
//         this.name = 'Console wrapper!';
//     }
//     speak(){
//         debugger;
//         console.log("Hello, I am ", this); //this == the object instance.
//     }
// }

describe('b', () => {

  //var expected = fs.readFileSync(__dirname + '/expected.txt', 'utf-8');

//console.log(JSON.stringify(ConsoleWrapper, null, 2))
  it('should equal fixture contents', () => {
    let c = new ConsoleWrapper();
    expect(typeof c.speak).to.equal('function');
  });

});
