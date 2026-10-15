async function fetchData() {
  const res = await fetch('http://localhost:3001/');   //important to have http
  const data = await res.json();
  console.log(data);
}


fetchData();