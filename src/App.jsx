import {ThemeProvider} from "@mui/material/styles";
import {theme} from "./config/theme.js";
import Layout from "./components/Layout.jsx";
import {Route, Routes} from "react-router-dom";
import {ROUTES} from "./config/routes.js";
import Peers from "./components/Peers.jsx";
import CreateProposal from "./components/CreateProposal.jsx";
import Me from "./components/Me.jsx"
import Ious from "./components/Ious.jsx";
import TransactionIou from "./components/TransactionIou.jsx";
import AcceptProposal from "./components/AcceptProposal.jsx";
import {ModifyProposal} from "./components/ModifyProposal.jsx";
import ModifyProposalForm from "./components/ModifyProposalForm.jsx"
import {useSetRecoilState} from "recoil";
import {ATOM_ME} from "./store/atoms.js"
import * as React from "react";
import api from "./api/index.js";
import ModifyIou from "./components/ModifyIou.jsx";

function App() {
    // initial states
    const setMe = useSetRecoilState(ATOM_ME)
    React.useEffect(() => {
        (async function () {
            const me = await api.me();
            console.log(me)
            setMe(me)
        })()
    }, [])


    return (
        <ThemeProvider theme={theme}>
            <Layout>
                <Routes>
                    <Route path={ROUTES.ROOT} element={<h1>Home</h1>}/>
                    <Route path={ROUTES.ME} element={<Me/>}/>
                    <Route path={ROUTES.PEERS} element={<Peers/>}/>
                    <Route path={ROUTES.PROPOSAL} element={<Ious/>}/>
                    <Route path={ROUTES.MODIFIERS} element={<ModifyIou/>}/>
                    <Route path={ROUTES.TRADES} element={<TransactionIou/>}/>
                    <Route path={ROUTES.CREATE_PROPOSAL} element={<CreateProposal/>}/>
                    <Route path={ROUTES.MODIFY_PROPOSAL} element={<ModifyProposal/>}/>
                    <Route path={ROUTES.ACCEPT_PROPOSAL} element={<AcceptProposal/>}/>
                    <Route path={ROUTES.MODIFY_PROPOSAL_FORM} element={<ModifyProposalForm/>}/>
                </Routes>
            </Layout>
        </ThemeProvider>
    )
}

export default App
