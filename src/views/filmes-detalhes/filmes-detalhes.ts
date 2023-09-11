import "./filmes-detalhes.css";
import { FilmeService } from '../../../services/filme.service';

export class DetalhesFilme {
  private filmeService: FilmeService;

  constructor() {
    this.filmeService = new FilmeService();
    
    const url = new URLSearchParams(window.location.search);
    const idDoFilme = url.get('id') as string;

    console.log(idDoFilme);

    this.filmeService.selecionarFilmePorId(idDoFilme).then((detalhesFilme) => {
      const tituloElement = document.querySelector('.titulo-filme');
      const votosElement = document.querySelector('.votos-filme');
      const sinopseElement = document.querySelector('.sinopse-filme');
      const lancamentoElement = document.getElementById('data-lancamento-filme');
      const posterElement = document.querySelector('.poster-filme');
      const trailerElement = document.querySelector('.trailer-filme');

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

      function preencherGeneros(generos: string[]) {
        const elementosGenero = document.querySelectorAll('.genero-filme');
        elementosGenero.forEach((elemento, index) => {
          if (index < generos.length) {
            elemento.textContent = generos[index];
          }
        });
      }
  
      preencherGeneros(detalhesFilme.generos);
      
      if (trailerElement) {
        this.filmeService.selecionarTrailersFilmePorId(idDoFilme)
        .then((trailers) => {
          if (trailers && trailers.length > 0) {
            const primeiroTrailer = trailers[0];
            const urlPrimeiroTrailer = primeiroTrailer.sourceUrl;
            if (trailerElement) {
              trailerElement.setAttribute('src', urlPrimeiroTrailer);
            }    
          } 
          else 
          {
            console.log("Nenhum trailer encontrado para este filme.");
          }
        })
        .catch((error) => {
          // Lide com erros, se necessário
          console.error(error);
        });
      }
    });
  }
}

window.addEventListener("load", () => { new DetalhesFilme(); });


// import { LocalStorageService } from "../../../services/local-storage.service";
// import { FilmeFavorito } from "../../../models/filme-favorito";
// import { CreditosFilme } from "../../../models/creditos-filme";
// import { DetalhesFilmes } from "../../../models/detalhes-filme";
// import "./filmes-detalhes.css";

// const params = new URLSearchParams(window.location.search);

// const id = params.get("id") as string;

// const filmeService = new FilmeService();
// const localStorageService = new LocalStorageService();

// const adicionarFavoritos = document.getElementById('adicionar-favorito');

// window.addEventListener('load', () => {

//   filmeService.selecionarFilmePorId(id).then(filme => {
//     document.title = filme.titulo + ' - Gerenciador de Cinema';

//     const img = document.getElementById('poster-filme') as HTMLImageElement;
//     img.src = filme.urlPoster;
    
//     const titulo = document.getElementById('titulo-filme');
//     titulo!.textContent = filme.titulo;

//     const dataLancamento = document.getElementById('data-lancamento');
//     dataLancamento!.textContent = filme.dataLancamento;

//     const secaoGeneros = document.getElementById('generos-filme');

//     filme.generos.forEach(genero => {
//       const elementoGenero = document.createElement('button');
//       elementoGenero.className = 'genero-filme';
//       elementoGenero.textContent = genero;

//       secaoGeneros?.appendChild(elementoGenero);
//     });

//     const sinopse = document.getElementById('sinopse-filme');
//     sinopse!.textContent = filme.sinopse;
//   })

//   filmeService.selecionarTrailersFilmePorId(id).then(trailers => {
//     const video = document.getElementById('video-filme') as HTMLIFrameElement;
//     video.src = trailers[0]?.sourceUrl ?? '' ;
//   });

//   filmeService.selecionarCreditosFilmePorId(id).then(creditos => {
//     selecionarDiretor(creditos);
//     selecionarEscritores(creditos);
//     selecionarAtores(creditos);
//   });

//   carregarStatusFavorito();
// });

// adicionarFavoritos?.addEventListener('click', (e) => {
//   e.preventDefault();

//   const favoritoEncontrado = localStorageService.selecionarPorId(id);
  
//   const icone = adicionarFavoritos!.children[0] as HTMLElement;

//   if (!favoritoEncontrado)
//   {
//     const novoFavorito: FilmeFavorito = { id: id };
//     localStorageService.inserir(novoFavorito);

//     icone.textContent = 'heart_minus';
//     icone.title = 'Remover favorito';
//     return;
//   }

//   localStorageService.excluir(id);

//   adicionarFavoritos.children[0].textContent = 'heart_plus';
//   icone.title = 'Adicionar favorito';
// });

// function selecionarDiretor(creditos: CreditosFilme[]) {
//   const diretor = creditos.find(c => c.departamento == 'Directing');

//   if (!diretor)
//     return;

//   const secaoDiretor = document.getElementById('diretor-filme');

//   const labelDiretor = document.createElement('p');
//   labelDiretor.textContent =  diretor.nome;

//   secaoDiretor?.appendChild(labelDiretor);
// }

// function selecionarEscritores(creditos: CreditosFilme[]) {
//   const escritores = creditos
//     .filter(c => c.departamento == 'Writing')
//     .sort((b, a) => b.ordem - a.ordem)
//     .slice(0, 5);

//   const secaoEscritores = document.getElementById('escritores-filme');

//   escritores.forEach(escritor => {
//     const novoCredito = document.createElement('p');
//     novoCredito.textContent =  escritor.nome;

//     const separador = document.createElement('p');
//     separador.textContent = ' • ';

//     secaoEscritores?.appendChild(novoCredito);

//     if (escritor != escritores[escritores.length - 1])
//       secaoEscritores?.appendChild(separador);
//   });
// }

// function selecionarAtores(creditos: CreditosFilme[]) {
//   const atores = creditos
//   .filter(c => c.departamento == 'Acting')
//   .sort((b, a) => b.ordem - a.ordem)
//   .slice(0, 5);

//   const secaoAtores = document.getElementById('atores-filme');

//   atores.forEach(ator => {
//     const novoCredito = document.createElement('p');
//     novoCredito.textContent =  ator.nome;

//     const separador = document.createElement('p');
//     separador.textContent = ' • ';

//     secaoAtores?.appendChild(novoCredito);

//     if (ator != atores[atores.length - 1])
//       secaoAtores?.appendChild(separador);
//   });
// }

// function carregarStatusFavorito() {
//   const favoritoEncontrado = localStorageService.selecionarPorId(id);

//   const icone = adicionarFavoritos!.children[0] as HTMLElement;

//   if (favoritoEncontrado)
//   {
//     icone.textContent = 'heart_minus';
//     icone.title = 'Remover favorito';
//     return;
//   }

//   icone.textContent = 'heart_plus';
//   icone.title = 'Adicionar favorito';
// }