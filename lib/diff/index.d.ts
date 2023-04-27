/**
 * program: "patienceDiff" algorithm implemented in javascript.
 * author: Jonathan Trent
 * version: 2.0
 *
 * use:  patienceDiff( aLines[], bLines[], diffPlusFlag )
 *
 * where:
 *      aLines[] contains the original text lines.
 *      bLines[] contains the new text lines.
 *      diffPlusFlag if true, returns additional arrays with the subset of lines that were
 *          either deleted or inserted.  These additional arrays are used by patienceDiffPlus.
 *
 * returns an object with the following properties:
 *      lines[] with properties of:
 *          line containing the line of text from aLines or bLines.
 *          aIndex referencing the index in aLines[].
 *          bIndex referencing the index in bLines[].
 *              (Note:  The line is text from either aLines or bLines, with aIndex and bIndex
 *               referencing the original index. If aIndex === -1 then the line is new from bLines,
 *               and if bIndex === -1 then the line is old from aLines.)
 *      lineCountDeleted is the number of lines from aLines[] not appearing in bLines[].
 *      lineCountInserted is the number of lines from bLines[] not appearing in aLines[].
 *      lineCountMoved is 0. (Only set when using patienceDiffPlus.)
 *
 */
/**
 * program: "patienceDiffPlus" algorithm implemented in javascript.
 * author: Jonathan Trent
 * version: 2.0
 *
 * use:  patienceDiffPlus( aLines[], bLines[] )
 *
 * where:
 *      aLines[] contains the original text lines.
 *      bLines[] contains the new text lines.
 *
 * returns an object with the following properties:
 *      lines[] with properties of:
 *          line containing the line of text from aLines or bLines.
 *          aIndex referencing the index in aLine[].
 *          bIndex referencing the index in bLines[].
 *              (Note:  The line is text from either aLines or bLines, with aIndex and bIndex
 *               referencing the original index. If aIndex === -1 then the line is new from bLines,
 *               and if bIndex === -1 then the line is old from aLines.)
 *          moved is true if the line was moved from elsewhere in aLines[] or bLines[].
 *      lineCountDeleted is the number of lines from aLines[] not appearing in bLines[].
 *      lineCountInserted is the number of lines from bLines[] not appearing in aLines[].
 *      lineCountMoved is the number of lines that moved.
 *
 */
declare const ___IGNORE: {
    lines: {
        line: string;
        aIndex: number;
        bIndex: number;
        moved?: boolean | undefined;
    }[];
    lineCountDeleted: number;
    lineCountInserted: number;
    lineCountMoved: number;
    aMove: string[];
    aMoveIndex: number[];
    bMove: string[];
    bMoveIndex: number[];
} | {
    lines: {
        line: string;
        aIndex: number;
        bIndex: number;
        moved?: boolean | undefined;
    }[];
    lineCountDeleted: number;
    lineCountInserted: number;
    lineCountMoved: number;
    aMove?: undefined;
    aMoveIndex?: undefined;
    bMove?: undefined;
    bMoveIndex?: undefined;
};
export type PatienceDiffResult = typeof ___IGNORE;
export type ChangeType = "deleted" | "inserted" | "changed" | "unknown";
export type Change = {
    lineNumber: number;
    changeType: ChangeType;
    lineContent: string;
    aIndex: number;
    bIndex: number;
};
export type DiffResult = {
    changes: Change[];
    deletedCount: number;
    insertedCount: number;
    movedCount: number;
    linedMovedFromA: string[];
    linesMovedFromB: string[];
    _diff: PatienceDiffResult;
};
declare const _default: {
    compare: (a: string, b: string) => DiffResult;
};
export default _default;
