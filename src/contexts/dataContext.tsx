import axios from 'axios';
import { createContext, useState, useEffect, useLayoutEffect } from 'react';
import { createAddaptedCharacter, createAddaptedCrew, createAddaptedQuote } from '../utilities/adapters';
export const DataContext = createContext<any>(null);

export function DataContextProvider({ children }: any) {
    const [charactersNames, setCharactersNames] = useState<null | string[]>(null);
    const [dataCharacters, setDataCharacters] = useState<any>(null);
    const [dataCrew, setDataCrew] = useState<any>(null);
    const [dataQuotes, setDataQuotes] = useState<any>(null);

    useLayoutEffect(() => {
        sendGetRequest();
    }, [])

    useEffect(() => {
        // console.log('dataCharacter', dataCharacters)
        console.log('dataCrew', dataCrew)
        // console.log('dataQuotes', dataQuotes)
    }, [dataCharacters, dataCrew, dataQuotes]);

    const sendGetRequest = async () => {
        try {
            const resp = await axios.get('https://officeapi.dev/api/characters/');
            const respQuote = await axios.get('https://officeapi.dev/api/quotes/');
            setDataCharacters(createAddaptedCharacter(resp.data.data))
            setDataQuotes(createAddaptedQuote(respQuote.data.data))
            setCharactersNames(resp.data.data.map(({ firstname }: any) => firstname));

        } catch (err) {
            console.error('Error fetching data: ', err);
        }
    };

    const sendGetCrew = async () => {
        try {
            const response = await axios.get('https://officeapi.dev/api/crew/');
            setDataCrew(createAddaptedCrew(response.data.data));
            // return response;
        } catch (error) {
            console.error('Error fetching crew: ', error);
        }
    }

    const getCrew = async () => {
        if (dataCrew) return dataCrew
        return await sendGetCrew();
    }

    const addMember = (newMember: any, addCharacter:boolean) => {

    }

    const updateMember = () => {

    }

    const findCharacterQuote = (id: any) => dataQuotes?.map((quote: any) => quote.characterId === id && quote.quote).filter((x: any) => x);

    return (
        <DataContext.Provider value={{
            charactersNames,
            dataCharacters,
            dataCrew,
            getCrew,
            addMember,
            updateMember,
            findCharacterQuote,
            sendGetCrew
        }}>
            {children}
        </DataContext.Provider>
    )
}

export default DataContext;