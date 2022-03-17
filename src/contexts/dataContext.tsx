import axios from 'axios';
import { createContext, useState, useEffect, useLayoutEffect } from 'react';
import { IQuote } from '../models';
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
        console.log('dataQuotes', dataQuotes)
    }, [dataQuotes])

    const sendGetRequest = async () => {
        try {
            const resp = await axios.get('https://officeapi.dev/api/characters/');
            const respQuote = await axios.get('https://officeapi.dev/api/quotes/');
            setDataQuotes(createAddaptedQuote(respQuote.data.data));
            setDataCharacters(createAddaptedCharacter(resp.data.data));
            let firstNameList = resp.data.data.map(({ firstname }: any) => firstname)
            // TODO: filter by last name
            // let lastNameList = resp.data.data.map(({ lastname }: any) => lastname)
            // setCharactersNames([...firstNameList, ...lastNameList]);
            setCharactersNames(firstNameList);
        } catch (err) {
            console.error('Error fetching data: ', err);
        }
    };

    const sendGetCrew = async () => {
        try {
            const response = await axios.get('https://officeapi.dev/api/crew/');
            setDataCrew(createAddaptedCrew(response.data.data));
            setCharactersNames(response.data.data.map(({ name }: any) => name.split(" ")[0]));
        } catch (error) {
            console.error('Error fetching crew: ', error);
        }
    }

    const sendGetCharacters = () => setCharactersNames(dataCharacters.map(({ firstName }: any) => firstName));

    const getCrew = async () => {
        if (dataCrew) return dataCrew
        return await sendGetCrew();
    }

    const addMember = (newMember: any, addCharacter: boolean) => addCharacter ? setDataCharacters([...dataCharacters, newMember]) : setDataCrew([...dataCrew, newMember]);

    const updateMember = () => {

    }

    const addQuote = (quote: IQuote) => setDataQuotes([...dataQuotes, quote]);

    const updataQuote = () => {

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
            sendGetCrew,
            sendGetCharacters,
            addQuote
        }}>
            {children}
        </DataContext.Provider>
    )
}

export default DataContext;