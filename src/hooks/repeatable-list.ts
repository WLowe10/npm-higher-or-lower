import { useRef } from "react";

export const useRepeatableList = <T>(items: Array<T>) => {
    const seenItems = useRef<Array<T>>([]);

    return () => {
        const unseenItems = items.filter(item => !seenItems.current.includes(item));
        const randomIdx = Math.floor(Math.random() * unseenItems.length);
        const randomItem = unseenItems[randomIdx];
        seenItems.current.push(randomItem);

        //clear the seen items once all items are seen
        if (seenItems.current.length == items.length) {
            seenItems.current = [];
        };

        return randomItem;
    };
};