//localhost: 3005
async function getData(){
    try{
        const res = await fetch('http://localhost:3005');
        const data = await res.json();
        console.log(data);
        
    }
    catch(e){
    console.log('Error fetching data',e);
}
}

getData();