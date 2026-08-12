import ActivepageContext from "./Activepagecontext";

export default function ActivepageContextProvider({children}){
    return (
        <ActivepageContext.provider value={activeview}>

        </ActivepageContext.provider >
    );
}