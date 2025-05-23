export class NoCategoriesFoundError extends Error{
  constructor () {
    super ("Nenhuma categoria encontrada!");
    this.name = "NoCategoriesFoundError";
  }
}