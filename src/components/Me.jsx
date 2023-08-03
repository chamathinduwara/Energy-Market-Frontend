import * as React from "react";
import api from "../api/index.js";


export default function Me() {

    // const me = useRecoilValue(ATOM_ME)
    const [me, setMe] = React.useState()

    React.useEffect(() => {
        (async function () {
            const me = await api.me();
            console.log(me)
            setMe(me)
            console.log(me)
        })()
    }, [])
    return (
        <div>
            <h1>My Identity: {me}</h1>
        </div>
    )
}