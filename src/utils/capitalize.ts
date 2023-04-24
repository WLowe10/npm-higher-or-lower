export const capitalize = (str: string) => {
    return str.at(0)?.toUpperCase() + str.slice(1);
};