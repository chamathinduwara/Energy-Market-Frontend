import axios from 'axios';
import {HOST, PATH, PORT, SCHEMA} from "../config/api.js";

const baseURL = `${SCHEMA}://${HOST}:${PORT}${PATH}`;

const client = axios.create({
    baseURL: baseURL,
});

const api = {
    peers: async () => {
        const res = await client.get("/peers");
        if (200 <= res.status < 300) {
            return res.data.peers
        } else {
            return null
        }
    },
    me: async () => {
        const res = await client.get("/me");
        if (200 <= res.status < 300) {
            return res.data.me
        } else {
            return null
        }
    },
    ious: async () => {
        const res = await client.get("/ious");
        if (200 <= res.status < 300) {
            console.log(res.data)
            return res.data
        } else {
            return null
        }
    },
    modifyIou: async () => {
        const res = await client.get("/modify-iou");
        if (200 <= res.status < 300) {
            console.log(res.data)
            return res.data
        } else {
            return null
        }
    },
    transcationIou: async () => {
        const res = await client.get("/transaction-iou");
        if (200 <= res.status < 300) {
            console.log(res.data)
            return res.data
        } else {
            return null
        }

    },
    modifystate: async (id) => {
        const res = await client.get(`/get-iou/${id}`);
        if (200 <= res.status < 300) {
            return res.data
        } else {
            return null
        }
    },
    proposal: {
        create: async (data) => {
            const res = await client.post("/api/create-proposal", data);
            if (200 <= res.status < 300) {
                return res.data
            } else {
                return null
            }
        },
        modify: async (data) => {
            const res = await client.post("/api/modify-proposal", data);
            if (200 <= res.status < 300) {
                return res.data
            } else {
                return null
            }
        },
        accept: async (data) => {
            const res = await client.post("/api/accept-proposal", data);
            if (200 <= res.status < 300) {
                return res.data
            } else {
                return null
            }
        },
        killProposal: async (data) => {
            const res = await client.post("/api/kill-proposal", data);
            if (200 <= res.status < 300) {
                return res.data
            } else {
                return null
            }
        },
        killModify: async (data) => {
            const res = await client.post("/api/kill-modify", data);
            if (200 <= res.status < 300) {
                return res.data
            } else {
                return null
            }
        }
    },


}

export default api