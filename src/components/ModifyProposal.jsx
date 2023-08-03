import * as React from "react";
import api from "../api/index.js";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";
import {ROUTES} from "../config/routes.js";
import {useRecoilValue} from "recoil";
import {ATOM_ME} from "../store/atoms.js";

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

export function ModifyProposal() {
    const [proposals, setProposals] = React.useState([])
    const me = useRecoilValue(ATOM_ME)
    const navigate = useNavigate()
    const [loading, setLoading] = React.useState(true)

    const modifyProposal = (proposalId) => {
        navigate(ROUTES.MODIFY_PROPOSAL_FORM.replace(":id", proposalId))
    }

    const killProposal = async (linearId) => {
        console.log("KILL PROPOSAL", linearId)
        const res = await api.proposal.killProposal({
            proposalId: linearId,
        })
        console.log("KILL PROPOSAL", res)
        navigate((ROUTES.ROOT))
    }

    React.useEffect(() => {
        (async function () {
            const data = await api.ious();
            setProposals(data || [])
            setLoading(false)
        })();
    }, [])

    if (loading) {
        return (
            <Loading/>
        )
    }
    if (proposals.length === 0) {
        return (
            <NotFound/>
        )
    }
    return (
        <div>
            {proposals.map((item, index) => (
                <div key={index}>
                    <h2>Transaction id: {item.state.data.linearId.id}</h2>
                    <p>Amount: {item.state.data.amount}</p>
                    <p>Unit Price: {item.state.data.unitPrice}</p>
                    <p>Buyer: {item.state.data.buyer}</p>
                    <p>Seller: {item.state.data.seller}</p>
                    <div>
                        <Stack spacing={2} direction="row">

                            <Button
                                variant="contained"
                                color="primary"
                                type="submit"
                                disabled={item.state.data.seller !== me}
                                onClick={() => modifyProposal(item.state.data.linearId.id)}
                            >
                                Modify
                            </Button>

                            <Button variant="contained" color="primary" type="submit"
                                    onClick={() => killProposal(item.state.data.linearId.id)}>
                                Kill
                            </Button>
                        </Stack>
                    </div>

                </div>
            ))}
        </div>
    );

}