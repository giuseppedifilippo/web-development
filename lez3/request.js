var req = new XMLHttpRequest();
req.onreadystatechange = function() {
    if (this.readyState== XMLHttpRequest.DONE && this.status == 200){
        console.log(this.response);

    }
}
req.open("GET", "https://swapi.info/api/");
req.send();

