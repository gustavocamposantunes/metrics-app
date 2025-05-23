export class NoProductsFoundError extends Error{
  constructor () {
    super ("Nenhuma produto encontrado!");
    this.name = "NoProductsFoundError";
  }
}