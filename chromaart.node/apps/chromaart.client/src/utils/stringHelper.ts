export {};

declare global {
  interface String {
    isNullOrWhitespace(): boolean;
    getPreview(): string;
  }
}

const PREVIEW_LENGTH: number = 120;

String.prototype.isNullOrWhitespace = function (this: string): boolean {
  if (this === null || this === undefined) return true;
  return !this || this.trim().length < 1;
};

String.prototype.getPreview = function (this: string): string {
  return this.length > PREVIEW_LENGTH
    ? this.substring(0, PREVIEW_LENGTH) + "..."
    : this;
};
