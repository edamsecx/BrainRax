import { Minifier } from "../minifier";

const methodVarMap = {
    memory: "m",
    ptr: "p",
    log: "l",
    prompt: "r",
    string: "s",
};

export class Transpiler {
    source: string = "";

    constructor(source: string) {
        this.source = new Minifier(source).safeSource.join("");
    }

    async transpile() {
        let transpiledCode = `/* Transpiled Code | by @EdamAme-x */;`;

        // initialize memory and ptr
        transpiledCode += `a=[];m=new Proxy(a,{get:function(e,t){if(t in e)return e[t];return e[t]=0;}});p=0;l=console.log;r=prompt;s=String.fromCharCode;`;

        // transpile
        for (let i = 0; i < this.source.length; i++) {
            const expr = this.source[i];
            switch (expr) {
                case ">":
                    transpiledCode += `${methodVarMap.ptr}++;`;
                    break;
                case "<":
                    transpiledCode += `${methodVarMap.ptr}--;`;
                    break;
                case "+":
                    transpiledCode += `${methodVarMap.memory}[${methodVarMap.ptr}]++;`;
                    break;
                case "-":
                    transpiledCode += `${methodVarMap.memory}[${methodVarMap.ptr}]--;`;
                    break;
                case ".":
                    transpiledCode += `${methodVarMap.log}(${methodVarMap.string}(${methodVarMap.memory}[${methodVarMap.ptr}]));`;
                    break;
                case ",":
                    transpiledCode += `${methodVarMap.memory}[${methodVarMap.ptr}]=${methodVarMap.prompt}().charCodeAt(0);`;
                    break;
                case "[":
                    transpiledCode += `while(${methodVarMap.memory}[${methodVarMap.ptr}]){`;
                    break;
                case "]":
                    transpiledCode += "}";
                    break;
                default:
                    break;
            }
        }

        return transpiledCode;
    }
}