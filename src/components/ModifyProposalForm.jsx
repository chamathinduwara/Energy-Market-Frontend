import api from "../api"
import {useNavigate, useParams} from "react-router-dom";
import * as React from "react";
import {useState} from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import {useFormik} from "formik";
import {ROUTES} from "../config/routes.js";


export default function ModifyProposalForm() {
    const {id} = useParams();
    const [proposal, setProposal] = useState({proposalId: '', amount: '', unitPrice: ''});
    const navigate = useNavigate()

    const onReset = () => {
        formik.setValues({
            proposalId: proposal.proposalId,
            newUnitPrice: proposal.unitPrice,
            newValue: proposal.amount,
        })
    }

    React.useEffect(() => {
        (async function () {
            const data = await api.modifystate(id);
            console.log(proposal)
            setProposal({
                proposalId: data.linearId.id,
                amount: data.unitPrice,
                unitPrice: data.amount
            })
        })();
    }, [id])

    React.useEffect(() => {
        onReset()
    }, [proposal])

    const formik = useFormik({
        initialValues: {
            proposalId: '',
            newValue: '',
            newUnitPrice: '',
        },
        onSubmit: async data => {
            console.log("MODIFY_PROPOSAL", data)
            const res = await api.proposal.modify(data)
            console.log(res)
            navigate(ROUTES.ROOT)
        },
    })

    return (
        <div>

            <div style={{display: "inline-block"}}>
                <Box
                    component="form"
                    sx={{
                        display: "grid",
                        gridTemplateColumns: "1fr",
                        gridGap: "1rem",
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "1fr 1fr",
                            gridGap: "1rem",
                        }}
                    >
                        <h1>Unit Amount:</h1>
                        <TextField
                            id="unit-amount"
                            label="Unit Amount"
                            variant="outlined"
                            type="number"
                            name="newValue"
                            value={formik.values.newValue}
                            onChange={formik.handleChange}
                        />
                    </div>
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "1fr 1fr",
                            gridGap: "1rem",
                        }}
                    >
                        <h1>Unit Price:</h1>
                        <TextField
                            id="unit-amount"
                            label="Unit Price"
                            variant="outlined"
                            type="number"
                            name="newUnitPrice"
                            value={formik.values.newUnitPrice}
                            onChange={formik.handleChange}
                        />
                    </div>
                    <div>
                        <Stack spacing={2} direction="row">
                            <Button variant="contained" color="primary" type="submit"
                                    onClick={formik.handleSubmit}
                            >
                                Submit
                            </Button>
                            <Button variant="outlined" color="secondary" onClick={onReset}>
                                Reset
                            </Button>
                        </Stack>
                    </div>

                </Box>

            </div>

        </div>
    )

}