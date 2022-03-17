import { DataContextProvider } from '../../contexts/dataContext';

const withUserContext = (WrappedComponent:any) => (props:any) => {
    return (
        <DataContextProvider>
            <WrappedComponent {...props} />
        </DataContextProvider>
    )
}

export default withUserContext;