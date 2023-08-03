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


export default function TransactionIou() {

    const [transcationIou, setTransactionIou] = React.useState([])
    const [loading, setLoading] = React.useState(true)

    React.useEffect(() => {
        (async function () {
            const transcationIou = await api.transcationIou();
            console.log(transcationIou)
            setTransactionIou(transcationIou)
            setLoading(false)
        })()
    }, [])
    if (loading) {
        return (
            <Loading/>
        )
    }
    if (transcationIou.length === 0) {
        return (
            <NotFound/>
        )
    }
    return (
        <div>
            <h1>TRADES</h1>
            {transcationIou.map((item, index) => (
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