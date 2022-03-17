export interface IModal {
    children?: JSX.Element,
    onModalClose: (arg: boolean) => void;
}

export interface IModalCharacter {
    onModalClose: (arg: boolean) => void;
    character: IPropCharacter;
}

export interface ICharacter {
    id: string;
    name: string;
    firstName: string;
    lastName: string;
    source: string;
    isCreated: boolean;
    isCrewMember: boolean;
}

export interface ICrew {
    id: string;
    name: string;
    firstName: string;
    lastName: string;
    role: string;
    isCreated: boolean;
    isCrewMember: boolean;
}

export interface IQuote {
    id: string;
    characterId: string;
    quote: string;
}

export interface IGridAdd {
    view: typeView;
}

export interface IListContainer {
    filterBy: string;
    orderBy: typeOrder;
    view: typeView;
}

export interface IHeader {
    onChangeView: (arg: typeView) => void;
}

export interface ISearch {
    onSearchOrder: (arg: string) => void;
}

export interface ISearchContainer {
    children: JSX.Element
}

export interface IPagination {
    onPageChange: (arg: number) => void;
    paginationLength: number;
}

export interface IModalAdd {
    onModalClose: (arg: boolean) => void;
    addCharacter: typeView;
}

export interface IGridCharacter {
    character: any;
    view: string;
}

export type typeOrder = 'firstName' | 'lastName';

export type typeView = 'characters' | 'crew';

export type IPropCharacter = ICharacter & ICrew;