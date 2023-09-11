import { FilmeFavorito } from "../models/filme-favorito";

export class LocalStorageService { 
  private readonly localStorage: Storage;

  private favoritos: FilmeFavorito[];

  constructor() 
  {
    this.localStorage = window.localStorage;
    this.favoritos = this.selecionarTodos();
  }

  public inserir(registro: FilmeFavorito): void 
  {
    this.favoritos.push(registro);
    this.gravar();
  }

  public excluir(id: string): void 
  {
    this.favoritos = this.favoritos.filter(x => x.id !== id);
    this.gravar();
  }

  public selecionarTodos(): FilmeFavorito[] 
  {
    const dados = this.localStorage.getItem("gerenciador-sistemas:favoritos");

    if (!dados)
      return [];

    return JSON.parse(dados);
  }

  public selecionarPorId(id: string): FilmeFavorito | undefined 
  {
    return this.favoritos.find(x => x.id === id);
  }
  
  private gravar(): void 
  {
    const favoritosJsonString = JSON.stringify(this.favoritos);
    this.localStorage.setItem("gerenciador-sistemas:favoritos", favoritosJsonString);
  }

  public carregarFavoritosSalvos(): FilmeFavorito {
    const favoritosJSON = localStorage.getItem('favoritos');
    if (favoritosJSON) {
        return JSON.parse(favoritosJSON);
    } else {
        return {
            id: '',
        };
    }
}

public salvarFavoritos(favoritos: FilmeFavorito) {
    localStorage.setItem('favoritos', JSON.stringify(favoritos));
}
}
