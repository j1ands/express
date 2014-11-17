//console.log("Node starting...");

var nodeStartingFunctionFileCode = require("./nodeStartingFunction");
//console.log(nodeStartingFunctionFileCode);
nodeStartingFunctionFileCode.nodeStartingFunction();

var buffer = '';
var fs = require('fs');
//console.log(fs);
//console.log(fs.readFileSync('./file1.txt','utf-8'));
//console.log(fs.readFileSync('./file1.txt').toString());
function setBuffer(data)
{
	buffer = data;
}


fs.readFile('./file1.txt', 'utf-8', function(err, data) {
    //console.log(data);
    buffer = data;
    console.log(buffer);
    //setBuffer(data);
    //console.log(buffer);
    //console.log(data);  // buffer object
    //console.log(data.toString());
});

//console.log("first");
//console.log(buffer);