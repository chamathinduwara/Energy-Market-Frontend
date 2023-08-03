import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import * as React from "react";
import {useFormik} from "formik";
import api from "../api"
import {useNavigate} from "react-router-dom";
import {ROUTES} from "../config/routes.js"

export default function CreateProposal() {

    const [peers, setPeers] = React.useState([])
    const navigate = useNavigate()
    const cancel = (() => {
        navigate(ROUTES.ROOT)
    })

    React.useEffect(() => {
        (async function () {
            const peers = await api.peers();
            setPeers(peers)
        })();
    }, [])

    const formik = useFormik({
        initialValues: {
            partyName: '',
            buyer: true,
            unitAmount: '',
            unitPrice: '',
        },
        onSubmit: async data => {
            console.log("CREATE_PROPOSAL", data)
            const res = await api.proposal.create(data)
            navigate(ROUTES.ROOT)
            console.log("CREATE_PROPOSAL_RES", res)

        },
    });

    const partyOptions = peers.map((party, index) => (
        <MenuItem key={index} value={party}>
            {party}
        </MenuItem>
    ));

    return (
        <div style={{display: "inline-block"}}>
            <h1>CREATE PROPOSAL</h1>
            <Box
                component="form"
                sx={{
                    display: "grid",
                    gridTemplateColumns: "1fr",
                    gridGap: "1rem",
                }}
                noValidate
                autoComplete="off"
                onSubmit={formik.handleSubmit}
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
                        label="Unit Amount (KWh)"
                        variant="outlined"
                        type="number"
                        name="unitAmount"
                        value={formik.values.unitAmount}
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
                        id="unit-price"
                        label="Unit Price (RS)"
                        variant="outlined"
                        type="number"
                        name="unitPrice"
                        value={formik.values.unitPrice}
                        onChange={formik.handleChange}
                    />
                </div>

                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gridGap: "1rem",
                        gridColumnStart: "auto",
                    }}
                >
                    <h1>Party:</h1>
                    <FormControl fullWidth>
                        <InputLabel id="party-label">Party</InputLabel>
                        <Select
                            labelId="party-label"
                            id="party-select"
                            label="Party"
                            name="partyName"
                            value={formik.values.partyName}
                            onChange={formik.handleChange}
                        >
                            {partyOptions}
                        </Select>
                    </FormControl>
                </div>

                <div>
                    <Stack spacing={2} direction="row">
                        <Button variant="contained" color="primary" type="submit"
                                onClick={formik.handleSubmit}
                        >
                            Submit
                        </Button>
                        <Button variant="outlined" color="secondary"
                        onClick={cancel}>
                            Cancel
                        </Button>
                    </Stack>
                </div>
            </Box>

        </div>

    );
}