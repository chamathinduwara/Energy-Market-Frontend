import * as React from "react"
import api from "../api"


export default function Peers() {

    const [peers, setPeers] = React.useState([])

    React.useEffect(() => {
        (async function () {
            const peers = await api.peers();
            console.log(peers)
            setPeers(peers)
        })()
    }, [])

    return (
        <div>
            {peers.map((item, index) => (
                <div key={index}>
                    <h1>PEERS: {item}</h1>
                </div>))}
        </div>
    )
}