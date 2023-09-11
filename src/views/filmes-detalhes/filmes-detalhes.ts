import "./filmes-detalhes.css";
import { FilmeService } from '../../../services/filme.service';
import { LocalStorageService } from "../../../services/local-storage.service"; 
import { FilmeFavorito } from "../../../models/filme-favorito";

export class DetalhesFilme {
  private filmeService: FilmeService;

  constructor() {
    this.filmeService = new FilmeService();

    const url = new URLSearchParams(window.location.search);
    const idDoFilme = url.get('id') as string;
    
    this.carregarDetalhesDoFilme(idDoFilme)
    .then(() => {
      this.carregarStatusFavorito(idDoFilme); });

    this.adicionarEventoCliqueIconeFavorito(idDoFilme);
  }

  private async carregarStatusFavorito(idDoFilme: string) {
    const localStorageService = new LocalStorageService();
    const favoritoEncontrado = localStorageService.selecionarPorId(idDoFilme);

    const icone = document.getElementById('icone-favorito') as HTMLElement;

    if (favoritoEncontrado) {
      icone.classList.remove('bi-heart');
      icone.classList.add('bi-heart-fill');
      icone.title = 'Remover dos favoritos';
    } else {
      icone.classList.remove('bi-heart-fill');
      icone.classList.add('bi-heart');
      icone.title = 'Adicionar aos favoritos';
    }
  }
  
  private async carregarDetalhesDoFilme(idDoFilme: string) {
    try {
      const detalhesFilme = await this.filmeService.selecionarFilmePorId(idDoFilme);
      this.exibirDetalhesNaPagina(detalhesFilme);
      this.carregarTrailer(idDoFilme);
    } catch (error) {
      console.error(error);
    }
  }

  private exibirDetalhesNaPagina(detalhesFilme: any) {
    const tituloElement = document.querySelector('.titulo-filme');
    const votosElement = document.querySelector('.votos-filme');
    const sinopseElement = document.querySelector('.sinopse-filme');
    const lancamentoElement = document.getElementById('data-lancamento-filme');
    const posterElement = document.querySelector('.poster-filme');

    if (tituloElement) {
      tituloElement.textContent = detalhesFilme.titulo;
    }

    if (votosElement) {
      votosElement.textContent = `${detalhesFilme.contagemVotos} Votos`;
    }

    if (sinopseElement) {
      sinopseElement.textContent = detalhesFilme.sinopse;
    }

    if (lancamentoElement) {
      lancamentoElement.textContent = detalhesFilme.dataLancamento;
    }

    if (posterElement) {
      posterElement.setAttribute('src', detalhesFilme.urlPoster);
    }

    this.preencherGeneros(detalhesFilme.generos);
  }

  private preencherGeneros(generos: string[]) {
    const elementosGenero = document.querySelectorAll('.genero-filme');
    elementosGenero.forEach((elemento, index) => {
      if (index < generos.length) {
        elemento.textContent = generos[index];
      }
    });
  }

  private async carregarTrailer(idDoFilme: string) {
    const trailerElement = document.querySelector('.trailer-filme');
    
    try {
      const trailers = await this.filmeService.selecionarTrailersFilmePorId(idDoFilme);

      if (trailers && trailers.length > 0) {
        const primeiroTrailer = trailers[0];
        const urlPrimeiroTrailer = primeiroTrailer.sourceUrl;

        if (trailerElement) {
          trailerElement.setAttribute('src', urlPrimeiroTrailer);
        }
      } else {
        console.log("Nenhum trailer encontrado para este filme.");
      }
    } catch (error) {
      console.error(error);
    }
  }
  private adicionarEventoCliqueIconeFavorito(idDoFilme: string) {
    const icone = document.getElementById('icone-favorito') as HTMLElement;

    icone.addEventListener('click', () => {
      const localStorageService = new LocalStorageService();
      const favoritoEncontrado = localStorageService.selecionarPorId(idDoFilme);

      if (!favoritoEncontrado) {
        const novoFavorito: FilmeFavorito = { id: idDoFilme };
        localStorageService.inserir(novoFavorito);
        icone.classList.remove('bi-heart');
        icone.classList.add('bi-heart-fill');
        icone.title = 'Remover dos favoritos';
      } else {
        localStorageService.excluir(idDoFilme);
        icone.classList.remove('bi-heart-fill');
        icone.classList.add('bi-heart');
        icone.title = 'Adicionar aos favoritos';
      }
    });
  }
}

window.addEventListener("load", () => { new DetalhesFilme(); });



