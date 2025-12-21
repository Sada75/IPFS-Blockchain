export const chunkFile = (buffer) => {
    const chunkSize = Number(process.env.CHUNK_SIZE);
    const chunks = [];
  
    for (let i = 0; i < buffer.length; i += chunkSize) {
      chunks.push(buffer.slice(i, i + chunkSize));
    }
  
    return chunks;
  };
  