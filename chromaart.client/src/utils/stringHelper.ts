export {};

declare global {
  interface String {
    isNullOrWhitespace(): boolean;
  }
}

String.prototype.isNullOrWhitespace = function (this: string): boolean {
  return !this || this.trim().length < 1;
};
