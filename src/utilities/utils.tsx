import { ICharacter } from "../models";

export const prepareSourceName = (firstName: string, lastName: string): string => `${firstName.toLowerCase()}_${lastName.toLowerCase()}`;

export const prepareName = (firstName: string, lastName: string): string => `${formattedUppercaseName(firstName)} ${formattedUppercaseName(lastName)}`;

export const formattedUppercaseName = (value: string): string => value.charAt(0).toUpperCase() + value.slice(1);

export const scrollToTop = () => window.scrollTo(0, 0);

export const debounce = (fn: any, delay: any) => {
    let timeout: any = -1;

    return (...args: any) => {
        if (timeout !== -1) {
            clearTimeout(timeout);
        }

        timeout = setTimeout(fn, delay, ...args);
    };
};

export function sortByFirstName(array: ICharacter[]) {
    return array.sort(function (a: any, b: any) {
        if (a.firstName > b.firstName) return 1;
        if (a.firstName < b.firstName) return -1;
        return 0;
    })

}
export function sortByLastName(array: ICharacter[]) {
    return array.sort(function (a: any, b: any) {
        if (a.lastName > b.lastName) return 1;
        if (a.lastName < b.lastName) return -1;
        return 0;
    })
}

export const selectSorce = (character: any): string => {
    let source: string;
    if (character.isCreated) {
        source = `url("/assets/not_found.jpeg")`;
    } else if (character.isCrewMember) {
        source = `url("/assets/not_found.jpeg")`;
    } else {
        source = `url("/assets/${character.source}.webp")`;
    }
    return source;
}