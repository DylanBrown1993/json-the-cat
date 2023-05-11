const request = require('request');

const fetchBreedDescription = function(breedName) {
  return new Promise((resolve, reject) => {
    const url = `https://api.thecatapi.com/v1/breeds/search?q=${breedName}`;

    request(url, (error, response, body) => {
      if (error) {
        reject(error);
        return;
      }

      const data = JSON.parse(body);
      if (data.length === 0) {
        reject(`Breed '${breedName}' not found.`);
        return;
      }

      const breed = data[0];
      const description = breed.description;
      resolve(description);
    });
  });
};

const breedName = process.argv[2];

if (!breedName) {
  console.log('Please provide a breed name as an argument.');
  process.exit(1);
}

fetchBreedDescription(breedName)
  .then(description => {
    console.log('Description:', description);
  })
  .catch(error => {
    console.log('Error:', error);
  });


module.exports = { fetchBreedDescription };


