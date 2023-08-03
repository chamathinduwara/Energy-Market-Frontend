import * as React from "react";
import {useRecoilValue} from "recoil";
import {ATOM_ME} from "../store/atoms.js";
import api from "../api/index.js";
import Stack from "@mui/material/Stack";
import {useNavigate} from "react-router-dom";
import {ROUTES} from "../config/routes.js";
import Button from "@mui/material/Button";
import {useFormik} from "formik";


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

export default function AcceptProposal() {
    const [modifiedProposal, setModifiedProposal] = React.useState([])
    const me = useRecoilValue(ATOM_ME)
    const navigate = useNavigate()
    const [loading, setLoading] = React.useState(true)

    React.useEffect(() => {
        (async function () {
            const data = await api.modifyIou();
            setModifiedProposal(data || [])
            setLoading(false)
        })();
    }, [])
    const acceptProposal = (linearId) => {
        formik.setFieldValue("proposalId", linearId);
        formik.handleSubmit();
    };
    const killModifiedProposal = (linearId) => {
        killFormic.setFieldValue("proposalId", linearId);
        killFormic.handleSubmit();
    }
    const killFormic = useFormik({
        initialValues: {
            proposalId: '',
        },
        onSubmit: async data => {
            console.log("KILL PROPOSAL", data)
            const res = await api.proposal.killModify(data)
            console.log("KILL PROPOSAL", res)
            navigate((ROUTES.ROOT))
        }
    });

    const formik = useFormik({
        initialValues: {
            proposalId: '',
        },
        onSubmit: async data => {
            console.log("ACCEPT PROPOSAL", data)
            const res = await api.proposal.accept(data)
            console.log("ACCEPT PORPOSAL", res)
            navigate(ROUTES.ROOT)
        },
    });
    if (loading) {
        return (
            <Loading/>
        )
    }
    if (modifiedProposal.length === 0) {
        return (
            <NotFound/>
        )
    }
    return (
        <div>
            {modifiedProposal.map((item, index) => (
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
                                disabled={item.state.data.buyer !== me}
                                onClick={() => acceptProposal(item.state.data.linearId.id)}
                            >
                                Accept
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                type="submit"
                                onClick={() => killModifiedProposal(item.state.data.linearId.id)}>
                                Kill
                            </Button>
                        </Stack>
                    </div>

                </div>
            ))}
        </div>
    );
}