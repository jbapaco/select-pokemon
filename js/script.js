document.getElementById("get-pokemon").addEventListener('click', function() {
  const pokemonName = document.getElementById("pokemon-select").value;
  console.log('Pokemon seleccionado:', pokemonName); // Mensaje de depuración

  const url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;
  console.log('URL de la API:', url); // Mensaje de depuración

  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
      return response.json();
    })
    .then(data => {
      console.log('Datos del Pokémon:', data); // Mensaje de depuración

      let tipos = '';
      data.types.forEach(typeInfo => {
        tipos += `${typeInfo.type.name} `;
      });

      const template = `
        <img src="${data.sprites.front_default}" alt="${data.name}" />
        <h2>Nombre: ${data.name}</h2>
        <h2>Tipo: ${tipos}</h2>
        <h2>Altura: ${data.height / 10} m</h2>
        <h2>Peso: ${data.weight / 10} kg</h2>
      `;
      
      document.getElementById("pokemon-info").innerHTML = template;
    })
    .catch(error => {
      console.error('Error fetching the Pokémon data:', error);
      document.getElementById("pokemon-info").innerHTML = `<p>Error al obtener los datos del Pokémon. Por favor, inténtalo de nuevo.</p>`;
    });
});
