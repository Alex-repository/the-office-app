import { useCallback, useContext, useEffect, useState } from 'react';
import DataContext from '../../contexts/dataContext';
import { ICharacter, ICrew, IPropCharacter, typeOrder } from '../../models';
import { sortByFirstName, sortByLastName } from '../../utilities/utils';
import ElementPlaceholder from '../ElementPlaceholder/ElementPlaceholder';
import GridAdd from '../GridAdd/GridAdd';
import Grid from '../GridCharacter/GridCharacter';
import Pagination from '../Pagination/Pagination';
import styles from './ListContainer.module.scss';

function ListContainer({ filterBy, orderBy, view }: any) {
    const { dataCharacters, dataCrew } = useContext(DataContext);
    const [pagePosition, setPagePosition] = useState({ start: 0, end: 5 });

    const paginationHandler = useCallback(
        (position: number) => {
            position === 1 ? setPagePosition({ start: 0, end: 5 }) : setPagePosition({ start: 0 + (5 * (position - 1)), end: 5 + (5 * (position - 1)) });
        }, [dataCharacters, dataCrew])

    const preparePagination = (dataCharacters: any, pagePosition: any) => {
        const formattedArray = orderBy === "firstName" ? sortByFirstName(dataCharacters) : sortByLastName(dataCharacters);
        return formattedArray.slice(pagePosition.start, pagePosition.end)
    }

    const paginationRender = useCallback(() => {
        const renderList: any = [];
        if (dataCharacters && view === "characters") {
            if (!!filterBy) {
                const filteredList = dataCharacters.find((character: IPropCharacter) => filterBy.toLocaleLowerCase() === character.firstName.toLocaleLowerCase());
                return filteredList && <Grid character={filteredList} />
            }
            renderList.push(preparePagination(dataCharacters, pagePosition).map((character: ICharacter) => {
                return <Grid key={character.id} character={character} />
            }));
            renderList.push(<GridAdd view={view} />)
            return renderList
        } else if (dataCrew && view === "crew") {
            if (!!filterBy) {
                const filteredList = dataCrew.find((character: IPropCharacter) => filterBy.toLocaleLowerCase() === character.firstName.toLocaleLowerCase());
                return filteredList && <Grid character={filteredList} />
            }
            renderList.push(preparePagination(dataCrew, pagePosition).map((character: any) => {
                return <Grid key={character.id} character={character} />
            }));
            renderList.push(<GridAdd view={view} />)
            return renderList
        } else {
            console.log("content placeholder")
            return Array.apply(null, Array(5)).map(function () { return <ElementPlaceholder /> })
        }
    }, [pagePosition, orderBy, dataCharacters, filterBy, dataCrew, view]);

    return (
        <>
            <div className={styles.container}>
                {paginationRender()}
            </div>
            <Pagination paginationLength={dataCharacters?.length} onPageChange={paginationHandler} />
        </>
    );
}

export default ListContainer;