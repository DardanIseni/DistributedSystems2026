
async function getDATA() {
    try{
        const res = await fetch ('localhost:3005');
        const data = await res.json();
        console.log(data);
    }
    catch (err){
        console.log(err);
    }
}

getDATA();