async function getData() {
    try{
        const res = await fetch('http://localhost:3005/');
        const data = await res.text();
        console.log(data);

    } catch (error) {
        console.error('Error:', error);
    }}

    getData();