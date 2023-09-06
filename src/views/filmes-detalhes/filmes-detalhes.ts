import { API_KEY } from "../../../secrets";
import "./filmes-detalhes.css";

export class DetalhesFilme {
  constructor() {
    fetch(
      "https://api.themoviedb.org/3/movie/popular?language=pt-BR",
      this.obterHeaderAutorizacao()
    )
      .then((res) => res.json())
      .then((obj) => console.log(obj));
  }

  private obterHeaderAutorizacao() {
    return {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
    };
  }
}

window.addEventListener("load", () => new DetalhesFilme());
