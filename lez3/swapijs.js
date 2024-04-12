fetch("https://swapi.info/api/")
var xmlhttp, xmldoc;
xmlhttp = new XMLHttpRequest;
xmlhttp.open("GET", "https://swapi.info/api/films/1", false);
xmlhttp.send()
xmldoc = xmlhttp.responseXML;
document.getElementById("titolo").innerHTML = xmldoc.getElementsByTagName("title")[0].childNodes[0].nodeValue;
