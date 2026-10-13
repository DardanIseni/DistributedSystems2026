// function getData() {
//     try {
//         const data = fetch('localhost:3005');
//         console.log(data)

//     } catch {
//         console.log('Error fetching data:')
//     } 

// }

// getData();

 async function getData() {
    try {
        const response = await fetch('http://localhost:3005');  
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.log('Error fetching data:', error);
    }
};

getData(); 