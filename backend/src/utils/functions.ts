export function generateRandomEmail() {
  return Math.random().toString(36).substring(2, 15) + "@test.com";
}

export function generateRandomINT() {
  return Math.floor(Math.random() * 1000);
}
