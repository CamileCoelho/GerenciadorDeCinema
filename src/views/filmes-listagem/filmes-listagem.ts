import 'bootstrap'
import './filmes-listagem.css'
import { FilmeService } from '../../../services/filme.service';
import { LocalStorageService } from '../../../services/local-storage.service';

const filmeService = new FilmeService();
const localStorageService = new LocalStorageService();

window.addEventListener('load', () => {
  selecionarFilmesFavoritos();
  selecionarFilmesPorPopularidade();
  // selecionarFilmesPorAvaliacao();
});


function selecionarFilmesPorPopularidade() {
  filmeService.selecionarFilmesPopulares()
    .then(filmes => {
      const secao = document.getElementById('filmes-por-popularidade');

      const filmesFavoritos = localStorageService.selecionarTodos();

      filmes.forEach(filme => {
        const poster = document.createElement('div');
        poster.className = 'poster-filme';

        poster.addEventListener('click', () => {
          window.location.href = `filmes-detalhes.html?id=${filme.id}`;
        });

        const img = document.createElement('img');
        img.src = filme.caminho_poster

        const titulo = document.createElement('p');
        titulo.textContent = filme.titulo;
        
        const filmeEncontrado = filmesFavoritos.find(x => x.id == filme.id.toString())
        
        if (filmeEncontrado != undefined)
          img.className = 'borda-filme-favorito';

        poster?.appendChild(img);
        poster?.appendChild(titulo);
        poster!.title = filme.titulo;

        secao?.appendChild(poster);
      });
    });
}

function selecionarFilmesPorAvaliacao() {
  filmeService.selecionarFilmesPorAvaliacao()
    .then(filmes => {
      const secao = document.getElementById('filmes-por-avaliacao');

      const filmesFavoritos = localStorageService.selecionarTodos();

      filmes.forEach(filme => {
        const poster = document.createElement('div');
        poster.className = 'poster-filme';

        poster.addEventListener('click', () => {
          window.location.href = `filmes-detalhes.html?id=${filme.id}`;
        });

        const img = document.createElement('img');
        img.src = filme.caminho_poster

        const titulo = document.createElement('p');
        titulo.textContent = filme.titulo;
        
        const filmeEncontrado = filmesFavoritos.find(x => x.id == filme.id.toString())
        
        if (filmeEncontrado != undefined)
          img.className = 'borda-filme-favorito';

        poster?.appendChild(img);
        poster?.appendChild(titulo);
        poster!.title = filme.titulo;

        secao?.appendChild(poster);
      });
    });
}

function selecionarFilmesFavoritos() {
  const filmesFavoritos = localStorageService.selecionarTodos();

  if (filmesFavoritos.length < 1) return;

  const lblHeaderFavoritos = document.getElementById('header-favoritos');
  const lblAviso = document.getElementById('aviso-sem-favoritos');

  lblHeaderFavoritos!.style.display = 'block';
  lblAviso!.style.display = 'block';

  const secao = document.getElementById('filmes-favoritos');

  filmesFavoritos.slice(0, 9).forEach(filme => {
    const listagem = filmeService.selecionarFilmeFavorito(filme.id);
      
    listagem.then(filmeFavorito => {
      const poster = document.createElement('div');
      poster.className = 'poster-filme';
  
      poster.addEventListener('click', () => {
        window.location.href = `filmes-detalhes.html?id=${filme.id}`;
      });
  
      const img = document.createElement('img');
      img.src = filmeFavorito.caminho_poster
  
      const titulo = document.createElement('p');
      titulo.textContent = filmeFavorito.titulo;
      
      poster?.appendChild(img);
      poster?.appendChild(titulo);
      poster!.title = filmeFavorito.titulo;
  
      secao?.appendChild(poster);
    });
  });
}
