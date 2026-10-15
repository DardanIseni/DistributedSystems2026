async function getData() {
    try {
        const response = await fetch('https://localhost:3000 ');
        const data = await response.json();
        console.log(data);
    } catch (e) {
        console.log(e);
    }
}

getData();  
