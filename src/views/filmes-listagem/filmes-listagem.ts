import 'bootstrap';
import './filmes-listagem.css';
import { FilmeService } from '../../../services/filme.service';
import { LocalStorageService } from '../../../services/local-storage.service';

class FilmeListagem {
  private filmeService: FilmeService;
  private localStorageService: LocalStorageService;

  constructor() {
    this.filmeService = new FilmeService();
    this.localStorageService = new LocalStorageService();

    window.addEventListener('load', () => {
      this.selecionarFilmesFavoritos();
      this.selecionarFilmesPopulares('filmes-por-popularidade');
      this.selecionarFilmesEmAlta('filmes-por-avaliacao');
    });
  }

  private selecionarFilmesPopulares(secaoId: string) {
    this.filmeService.selecionarFilmesPopulares()
      .then(filmes => {
        const secao = document.getElementById(secaoId);

        const filmesFavoritos = this.localStorageService.selecionarTodos();

        filmes.forEach(filme => {
          const poster = this.criarPosterFilme(filme, filmesFavoritos);

          secao?.appendChild(poster);
        });
      });
  }

  private selecionarFilmesEmAlta(secaoId: string) {
    this.filmeService.selecionarFilmesPorAvaliacao()
      .then(filmes => {
        const secao = document.getElementById(secaoId);

        const filmesFavoritos = this.localStorageService.selecionarTodos();

        filmes.forEach(filme => {
          const poster = this.criarPosterFilme(filme, filmesFavoritos);

          secao?.appendChild(poster);
        });
      });
  }

  private criarPosterFilme(filme: any, filmesFavoritos: any[]) {
    const poster = document.createElement('div');
    poster.className = 'poster-filme';

    poster.addEventListener('click', () => {
      window.location.href = `filmes-detalhes.html?id=${filme.id}`;
    });

    const img = document.createElement('img');
    img.src = filme.caminho_poster;

    const titulo = document.createElement('p');
    titulo.textContent = filme.titulo;

    const filmeEncontrado = filmesFavoritos.find(x => x.id == filme.id.toString());

    if (filmeEncontrado != undefined)
      img.className = 'borda-filme-favorito';

    poster?.appendChild(img);
    poster?.appendChild(titulo);
    poster!.title = filme.titulo;

    return poster;
  }

  private selecionarFilmesFavoritos() {
    const filmesFavoritos = this.localStorageService.selecionarTodos();

    if (filmesFavoritos.length < 1) return;

    const lblHeaderFavoritos = document.getElementById('header-favoritos');
    const lblAviso = document.getElementById('aviso-sem-favoritos');

    lblHeaderFavoritos!.style.display = 'block';
    lblAviso!.style.display = 'block';

    const secao = document.getElementById('filmes-favoritos');

    filmesFavoritos.slice(0, 9).forEach(filme => {
      const listagem = this.filmeService.selecionarFilmeFavorito(filme.id);

      listagem.then(filmeFavorito => {
        const poster = this.criarPosterFilme(filmeFavorito, []);

        secao?.appendChild(poster);
      });
    });
  }
}

new FilmeListagem();
