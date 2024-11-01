type OnDataCallback = (chunk: string) => void;

export function smoothOutput(
  text: string,
  onData: OnDataCallback,
  chunkSize: number = 3,
  delay: number = 10
): Promise<void> {
  return new Promise((resolve) => {
    let index = 0;

    function outputNextChunk() {
      if (index < text.length) {
        const nextChunk = text.slice(index, index + chunkSize);
        onData(nextChunk);
        index += chunkSize;
        setTimeout(outputNextChunk, delay); // Delay between outputs
      } else {
        resolve();
      }
    }

    outputNextChunk();
  });
}

export interface PaginationModel {
  page: number;
  pageSize: number;
}

export const paginationModel: PaginationModel = { page: 0, pageSize: 10 };
