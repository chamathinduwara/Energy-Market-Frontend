import * as React from "react"
import api from "../api"

function NotFound() {

    return (
        <div>
            <h1>Nothing to show</h1>
        </div>
    )
}

function Loading() {

    return (
        <div>
            <h1>loading ...</h1>
        </div>
    )
}

export default function Ious() {

    const [ious, setIous] = React.useState(null)
    const [loading, setLoading] = React.useState(true)

    React.useEffect(() => {
        (async function () {
            const ious = await api.ious();
            console.log(ious)
            setIous(ious)
            setLoading(false)
        })()
    }, [])

    // let proposals = [];
    // if (ious != null){
    //     proposals = ious;
    // }
    if (loading) {
        return (
            <Loading/>
        )
    }
    if (ious.length === 0) {
        return (
            <NotFound/>
        )
    }


    return (
        <div>
            <h1>PROPOSALS</h1>
            {ious.map((item, index) => (
                <div key={index}>
                    <h2>Transaction id: {item.state.data.linearId.id}</h2>
                    <p>Amount: {item.state.data.amount}</p>
                    <p>Unit Price: {item.state.data.unitPrice}</p>
                    <p>Buyer: {item.state.data.buyer}</p>
                    <p>Seller: {item.state.data.seller}</p>

                </div>
            ))}
        </div>

    )
}