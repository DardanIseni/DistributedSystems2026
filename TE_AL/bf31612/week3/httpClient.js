async function getData(){
    try{
        const res = await fetch('http://localhost:3005')
        const data = await res.json();
        console.log(data);
    }
    catch(err){ 
    console.log(err);
    }
}

getData();