// RUNTIME WIP

export class Emulator {
  constructor(public source: string) {}

  async run() {
    const memory: number[] = [];
    let ptr = 0;

    for (let i = 0, len = this.source.length; i < len; i++) {
      const expr = this.source[i];

      switch (expr) {
        case "+":
          memory[ptr]++;
          break;
        case "-":
          memory[ptr]--;
          break;
        case ">":
          ptr++;
          break;
        case "<":
          if (ptr === 0) break;
          ptr--;
          break;
        case ".":
          await Bun.write(Bun.stdout, String.fromCharCode(memory[ptr]));
          break;
        case ",":
          let _m = [];
          for await (const chunk of Bun.stdin.stream()) {
            const chunkText = Buffer.from(chunk).toString();
            _m.push(chunkText.charCodeAt(0));
            if (chunkText === "\n") {
              await Bun.write(Bun.stdout, String.fromCharCode(..._m));
              break;
            } else if (chunkText === "\b") {
              _m.pop();
            } else {
              await Bun.write(Bun.stdout, String.fromCharCode(..._m));
            }
          }
          memory[ptr] = _m[0];  
          break;
        case "[":
          if (memory[ptr] === 0) {
            let count = 1;
            while (count > 0) {
              i++;
              if (this.source[i] === "[") count++;
              if (this.source[i] === "]") count--;
            }
            i--;
          }
          break;
        case "]":
          if (memory[ptr] !== 0) {
            let count = 1;
            while (count > 0) {
              i--;
              if (this.source[i] === "]") count++;
              if (this.source[i] === "[") count--;
            }
            i++;
          }
          break;
      }
    }
  }
}
