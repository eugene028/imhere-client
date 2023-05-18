import { useRef } from "react";
import { useEffect } from "react";

export default function useBottomSheet(handler : () => void) {
    const sheet = useRef<HTMLDivElement>(null);
    const content = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const listener = (e: any) => {
            if(!content.current || content.current.contains(e.target)){
                return;
            }
            handler();
        };
        document.addEventListener("mousedown", listener);
        document.addEventListener("touchstart", listener);
        return () => {
            document.addEventListener("mousedown", listener);
            document.addEventListener("touchstart", listener);
        }
    });
    return {sheet, content}
};