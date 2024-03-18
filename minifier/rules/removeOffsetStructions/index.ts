import type { afterOptSource } from "../../optimization";

/**
 *  Remove offsetting constructions
 *  `++++---.` => `+.`
 *  `<<>>><++.` => `++.`
 */

const badExpr = ["<>", "><", "+-", "-+"] as const;

export function RemoveOffsetStructions(source: afterOptSource): afterOptSource {

    let $ = source.join("");
    const badExprRemover = [];

    for (let i = 0, badExprLen = badExpr.length; i < badExprLen; i++) {
        const badExprWord = badExpr[i];

        badExprRemover.push({
            word: badExprWord,
            remove: () => {
                $ = $.replace(badExprWord, "");
            },
            isInclude: () => $.includes(badExprWord),
        })
    }

    while (!0) {
        if (badExprRemover.every(({ isInclude }) => !isInclude())) {
            break;
        } else {
            for (let i = 0, badExprRemoverLen = badExprRemover.length; i < badExprRemoverLen; i++) {
                if (!badExprRemover[i].isInclude()) {
                    continue;
                }
                const { remove } = badExprRemover[i];
                remove();
            }
        }        
    }

    return $.split("") as unknown as afterOptSource;
}
