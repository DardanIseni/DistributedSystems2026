async function getData(){
    try {
        const response = await fetch("http://localhost:3005");
        const data = await response.json();
        console.log(data);
    }
    catch (error) {
        console.log(error);
    }
}
getData();