// write me a getData function to get data from localhost:3005
const getData = async () => {
    try {
        const response = await fetch('http://localhost:3005/'); 
        const data = await response.json();
        console.log(data)
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

getData()