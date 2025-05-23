export class InvalidParamsError extends Error{
  constructor () {
    super ("Parâmetros inválidos!");
    this.name = "InvalidParams";
  }
}