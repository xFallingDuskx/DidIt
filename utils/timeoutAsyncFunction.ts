export default function timeoutAsyncFunction<T>(
  asyncFunction: () => Promise<T>,
  timeoutMs: number = 10000,
  maxRetries: number = 3,
  objective: string = 'run async function',
) {
  let retries = 0;
  const timeoutPromise = new Promise<T>((_resolve, reject) => {
    setTimeout(() => {
      reject(
        new Error(`Timeout: took longer than ${timeoutMs}ms to ${objective}`),
      );
    }, timeoutMs);
  });

  // Race between the async function and the timeout promise
  const retry = async (): Promise<T> => {
    try {
      return await Promise.race([asyncFunction(), timeoutPromise]);
    } catch (error) {
      console.error(error);

      retries++;
      if (retries >= maxRetries) {
        throw error;
      }

      return retry();
    }
  };

  return retry();
}
