import { BuiltInFunctionKey, Context } from "./index";
export type BuiltinExample = {
    input: {
        text: string;
        context?: Context;
    };
    output: string | (<T>(result: T) => boolean);
    notes?: string[];
};
export type BuiltinDoc = {
    description: string;
    examples: BuiltinExample[];
    isDeprecated: boolean;
};
export type BuiltinDocs = {
    [key in BuiltInFunctionKey]: BuiltinDoc;
};
declare const docs: BuiltinDocs;
export default docs;
