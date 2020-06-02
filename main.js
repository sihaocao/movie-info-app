$(document).ready(() => {
  $('#searchForm').on('submit', event => {
    let searchText = $('#searchText').val();
    getMovies(searchText);
    event.preventDefault();
  });
});

getMovies = searchText => {
  axios
    .get(`http://www.omdbapi.com/?apikey=45555b91&s=${searchText}`)
    .then(response => {
      let movies = response.data.Search;
      let output = '';
      $.each(movies, (index, movie) => {
        output += `
          <div class="col-md-3" id=${index}>
            <div class="well text-center">
              <img src="${movie.Poster}">
              <h5>${movie.Title}</h5>
              <a onClick="movieSelected('${movie.imdbID}')" class="btn btn-primary" href="#">Movie Details</a>
            </div>
          </div>
        `;
      });
      $('#movies').html(output);
    })
    .catch(error => {
      console.log(error);
    });
};

movieSelected = id => {
  sessionStorage.setItem('movieId', id);
  window.location = 'movie.html';
  return false;
};

getMovie = () => {
  let movieId = sessionStorage.getItem('movieId');
  axios
    .get(`http://www.omdbapi.com/?apikey=45555b91&i=${movieId}`)
    .then(response => {
      let movie = response.data;
      let output = `
        <div class="row">
          <div class="col-md-4">
            <img src="${movie.Poster}" class="thumbnail">
          </div>
          <div class="col-md-8">
            <h2>${movie.Title}</h2>
            <ul class="list-group">
              <li class="list-group-item"><strong>Genre:</strong> ${movie.Genre}</li>
              <li class="list-group-item"><strong>Released:</strong> ${movie.Released}</li>
              <li class="list-group-item"><strong>Rated:</strong> ${movie.Rated}</li>
              <li class="list-group-item"><strong>Rating:</strong> ${movie.imdbRating}</li>
              <li class="list-group-item"><strong>Director:</strong> ${movie.Director}</li>
              <li class="list-group-item"><strong>Writer:</strong> ${movie.Writer}</li>
              <li class="list-group-item"><strong>Actors:</strong> ${movie.Actors}</li>
            </ul>
          </div>
        </div>
        <div class="row">
          <div class="well">
            <h3>Plot</h3>
            ${movie.Plot}
            <hr>
            <a href="https://imdb.com/title/${movieId}" target="_blank" class="btn btn-primary">View IMDB</a>
            <a href="index.html" class="btn btn-secondary">Go Back To Search</a>
            </hr>
          </div>
        </div>
      `;
      $('#movie').html(output);
    })
    .catch(error => {
      console.log(error);
    });
};
