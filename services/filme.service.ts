import { ListagemFilme } from "../models/listagem-filme";
import { CreditosFilme } from "../models/creditos-filme";
import { DetalhesFilmes } from "../models/detalhes-filme";
import { API_KEY } from "../secrets";

export class FilmeService {

  async selecionarFilmePorId(id: string): Promise<DetalhesFilmes> 
  {
    const url = `https://api.themoviedb.org/3/movie/${id}?language=pt-BR`;

    const resultado = await fetch(url, this.obterHeadersAutorizacao()).then(res => res.json());

    return this.mapearDetalhesFilme(resultado);
  }

  async selecionarTrailersPorId(id: string): Promise<any[]> 
  {
    const url = `https://api.themoviedb.org/3/movie/${id}/videos`;

    const resultado = await fetch(url, this.obterHeadersAutorizacao()).then(res => res.json());

    const objetos = resultado.results as any[];

    const trailersMapeados = objetos.map(obj => {
      return {
        id: obj.id,
        sourceUrl: "https://www.youtube.com/embed/" + obj.key,
      }
    })

    return trailersMapeados;
  }

  async selecionarCreditosPorId(id: string): Promise<CreditosFilme[]> 
  {
    const url = `https://api.themoviedb.org/3/movie/${id}?language=pt-BR`;

    const resultado = await fetch(url, this.obterHeadersAutorizacao()).then(res => res.json());

    const objetos = resultado.cast as any[];

    const creditosMapeados: CreditosFilme[] = objetos.map(obj => {
      return {
        ordem: obj.order,
        nome: obj.name,
        departamento: obj.known_for_department,
        caminho_imagem: obj.profile_path,
        personagem: obj.character
      }
    })

    return creditosMapeados;
  }

  async selecionarFilmesPorAvaliacao(): Promise<ListagemFilme[]> 
  {
    const url = `https://api.themoviedb.org/3/movie/top_rated?language=pt-BR`;

    const resultados = await fetch(url, this.obterHeadersAutorizacao()).then(res => res.json());

    const objetos = resultados.results as any[];

    return objetos.map(this.mapearListagemFilme).slice(0, 10);
  }

  async selecionarFilmesPopulares(): Promise<ListagemFilme[]> 
  {
    const url = `https://api.themoviedb.org/3/movie/popular?language=pt-BR`;

    const resultados = await fetch(url, this.obterHeadersAutorizacao()).then(res => res.json());

    const objetos = resultados.results as any[];

    return objetos.map(this.mapearListagemFilme).slice(0, 10);
  }

  async selecionarFilmeFavorito(id: string): Promise<ListagemFilme> 
  {
    const url = `https://api.themoviedb.org/3/movie/${id}?language=pt-BR`;

    const resultado = await fetch(url, this.obterHeadersAutorizacao()).then(res => res.json());

    return this.mapearListagemFilme(resultado);
  }

  private mapearDetalhesFilme(obj: any) : DetalhesFilmes 
  {
    return {
      id: obj.id,
      titulo: obj.title,
      urlPoster: 'https://image.tmdb.org/t/p/original/' + obj.poster_path,
      urlTrailer: `https://api.themoviedb.org/3/movie/${obj.id}/videos`,
      mediaNota: obj.vote_average,
      contagemVotos: obj.vote_count,
      dataLancamento: obj.release_date,
      sinopse: obj.overview,
      generos: obj.genres?.map((g: any) => g.name as string)
    }
  }

  private mapearListagemFilme(obj: any) : ListagemFilme 
  {
    return {
      id: obj.id,
      titulo: obj.title,
      sinopse: obj.sinopse,
      caminho_poster: 'https://image.tmdb.org/t/p/original/' + obj.poster_path,
      media_nota: obj.vote_average,
      data_lancamento: obj.release_date
    }
  }

  private obterHeadersAutorizacao() 
  {
    return {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: API_KEY
      }
    }
  }
}