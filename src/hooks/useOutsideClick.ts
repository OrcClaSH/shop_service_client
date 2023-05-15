import { useEffect, useRef, useState } from "react";

export const useOutsideClick = (initialIsVisible: boolean) => {
    const [isShow, setIsShow] = useState(initialIsVisible);
    const ref = useRef<HTMLDivElement | null>(null);

    const handleClickOutside = (event: MouseEvent) => {
        if (event.target instanceof Node && !ref.current?.contains(event.target)) {
            setIsShow(false);
        }
    }

    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true);

        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        }
    }, [])

    return { ref, isShow, setIsShow };
};
