import { useCallback, useContext, useEffect, useState } from 'react';
import DataContext from '../../contexts/dataContext';
import { ICharacter, ICrew, typeOrder } from '../../models';
import { sortByFirstName, sortByLastName } from '../../utilities/utils';
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
        if (dataCharacters && view === "characters") {
            if (!!filterBy) {
                const filteredList = dataCharacters.find((character: ICharacter) => filterBy.toLocaleLowerCase() === character.firstName.toLocaleLowerCase());
                return filteredList && <Grid character={filteredList} />
            }
            return preparePagination(dataCharacters, pagePosition).map((character: ICharacter) => {
                return <Grid key={character.id} character={character} />
            });
        } else if (dataCrew && view === "crew") {
            return preparePagination(dataCrew, pagePosition).map((character: any) => {
                return <Grid key={character.id} character={character} />
            });
        } else {
            console.log("content placeholder")
        }
    }, [pagePosition, orderBy, dataCharacters, filterBy, dataCrew, view]);

    return (
        <>
            <div className={styles.container}>
                {paginationRender()}
                <GridAdd view={view}/>
            </div>
            <Pagination paginationLength={dataCharacters?.length} onPageChange={paginationHandler} />
        </>
    );
}

export default ListContainer;