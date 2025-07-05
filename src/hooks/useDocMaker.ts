import { useEffect, useState } from "react";
import initDocMaker, { type InitOutput } from "doc-maker";

export type DocMaker = {
    toPdf: (images: string[]) => void;
    loading: boolean;
    error: string | null;
}

export default function useDocMaker() {
    const [wasm, setWasm] = useState<InitOutput | null>(null);
    const [processing, setProcessing] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        initDocMaker().then(setWasm);
    }, []);

    const docMaker: DocMaker = {
        toPdf: (images: string[]) => {
            if (!wasm) {
                setError("WASM not initialized");
                return;
            }
            setProcessing(true);
            wasm.to_pdf(images);
            setProcessing(false);
        },
        loading: wasm === null || processing,
        error,
    };

    return docMaker;
}