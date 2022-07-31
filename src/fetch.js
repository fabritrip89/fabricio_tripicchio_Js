  const options = {
    method: 'POST',
    body: JSON.stringify({
      title: 'RockPadel',
      body: 'Prueba',
      userId: 1,
    }),
    headers: {
      'content-type': 'application/json; charset=UTF-8',
    },
  };
  
  fetch('https://jsonplaceholder.typicode.com/posts', options)
    .then((response) => response.json())
    .then((data) => console.log(data)); 


    
