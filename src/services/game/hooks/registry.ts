import { useState, useEffect } from "react";
import { formatGhUrl } from "@utils/index";

type ReturnType = {
    description?: string,
    repository?: string
};

export const useRegistry = (name: string) => {
    const [info, setInfo] = useState<ReturnType>({});

    const getInfo = async (name: string) => {
        const response = await fetch(`https://registry.npmjs.org/${name}`, {
            method: "GET"
        });

        const { description, repository } = await response.json();

        setInfo({
            description,
            repository: repository && repository.type == "git" ? formatGhUrl(repository.url) : undefined
        });
    };

    useEffect(() => {
        getInfo(name)
    }, [name])

    return info;
}