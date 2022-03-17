import { ICharacter, ICrew, IQuote } from '../models';
import { prepareSourceName } from './utils'

export const createAddaptedCharacter = (characters: ICharacter[]) => {

    const formattedCharacters: ICharacter[] = characters.map((character: any) => {
        const lastName = character.lastname === "null" ? "" : character.lastname;
        return {
            id: character._id,
            name: `${character.firstname} ${lastName}`,
            firstName: character.firstname,
            lastName,
            source: prepareSourceName(character.firstname, character.lastname),
            isCreated: false,
            isCrewMember: false,
        }
    })
    return formattedCharacters;
}

export const createAddaptedCrew = (crew: ICrew[]) => {

    const formattedCrew: ICrew[] = crew.map((member: any) => {
        return {
            id: member._id,
            firstName: member.name.split(" ")[0],
            lastName: member.name.split(" ")[1],
            name: member.name,
            source: prepareSourceName(member.name.split(" ")[0], member.name.split(" ")[1]),
            role: member.role,
            isCreated: false,
            isCrewMember: true
        }
    })
    return formattedCrew;
}

export const createAddaptedQuote = (quotes: IQuote[]) => {

    const formattedQuotes: IQuote[] = quotes.map((quote: any) => {
        return {
            id: quote._id,
            characterId: quote.character._id,
            quote: quote.content
        }
    })
    return formattedQuotes;
}