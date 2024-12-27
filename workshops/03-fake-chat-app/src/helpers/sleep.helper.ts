async function sleep(seconds: number = 1): Promise<undefined> {
  return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
}

export { sleep };
