import { Minifier } from "../minifier";

export class Transpiler {
    source: string = "";

    constructor(source: string) {
        this.source = new Minifier(source).safeSource.join("");
    }

    transpile() {
        let transpiledCode = `/* Transpiled Code | by @EdamAme-x */`;

        const rawMemory = `a=[]`
        const proxyMemory = `m=new Proxy(a,{get(e,t){return(t in e)?e[t]:e[t]=0}})`
        const pointer = `p=0`
        const logger = `l=console.log`
        const reader = `r=prompt`
        const stringer = `s=String.fromCharCode`

        // initialize memory and ptr
        transpiledCode += `${[rawMemory, proxyMemory, pointer, logger, reader, stringer].join(",")};`;

        // transpile
        for (let i = 0; i < this.source.length; i++) {
            const expr = this.source[i];
            switch (expr) {
                case ">":
                    transpiledCode += `p++;`;
                    break;
                case "<":
                    transpiledCode += `p--;`;
                    break;
                case "+":
                    transpiledCode += `m[p]++;`;
                    break;
                case "-":
                    transpiledCode += `m[p]--;`;
                    break;
                case ".":
                    transpiledCode += `l(s(m[p]));`;
                    break;
                case ",":
                    transpiledCode += `m[p]=r().charCodeAt(0);`;
                    break;
                case "[":
                    transpiledCode += `while(m[p]){`;
                    break;
                case "]":
                    transpiledCode += "}";
                    break;
                default:
                    break;
            }
        }

        // finalize
        transpiledCode += `a=[],p=0;`;

        return this.transpiledMinify(transpiledCode);
    }

    transpiledMinify(transpliedCode: string): string {
        // m[p]++;m[p]++; => m[p]+=2; m[p]++;x3 => m[p]+=3
        while (!0) {
            if (!transpliedCode.includes("m[p]++;m[p]++;")) {
                break;
            }else {
                transpliedCode = transpliedCode.replace(/(m\[p\]\+\+\;){2,}/g, (match) => {
                    const consecutive = match.replace(/m\[p\]\+\+;/g, "_").length;
                    return `m[p]+=${consecutive};`;
                });
            }
        }

        // m[p]--;m[p]--; => m[p]+=2; m[p]--;x3 => m[p]+=3
        while (!0) {
            if (!transpliedCode.includes("m[p]--;m[p]--;")) {
                break;
            }else {
                transpliedCode = transpliedCode.replace(/(m\[p\]\-\-\;){2,}/g, (match) => {
                    const consecutive = match.replace(/m\[p\]\-\-;/g, "_").length;
                    return `m[p]-=${consecutive};`;
                });
            }
        }

        // p++;p++; => p+=2; p++;x3 => p+=3
        while (!0) {
            if (!transpliedCode.includes("p++;p++;")) {
                break;
            }else {
                transpliedCode = transpliedCode.replace(/(p\+\+\;){2,}/g, (match) => {
                    const consecutive = match.replace(/p\+\+;/g, "_").length;
                    return `p+=${consecutive};`;
                });
            }
        }

        // p--;p--; => p+=2; p--;x3 => p+=3
        while (!0) {
            if (!transpliedCode.includes("p--;p--;")) {
                break;
            }else {
                transpliedCode = transpliedCode.replace(/(p\-\-\;){2,}/g, (match) => {
                    const consecutive = match.replace(/p\-\-;/g, "_").length;
                    return `p-=${consecutive};`;
                });
            }
        }

        return transpliedCode;
    }
}