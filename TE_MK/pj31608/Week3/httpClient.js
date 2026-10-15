//write m a getData function to getr data from localhost:3005 
const getData = async () => {
    try {
        const response = await fetch('http://localhost:3005/');
        const data = await response.text();
        console.log(data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

getData();