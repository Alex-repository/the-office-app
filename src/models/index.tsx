export interface IModal {
    children?: JSX.Element,
    onModalClose: (arg: boolean) => void;
}

export interface IModalCharacter {
    onModalClose: (arg: boolean) => void;
    character: ICharacter;
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

export type typeOrder = 'firstName' | 'lastName';

export type typeView = 'characters' | 'crew';