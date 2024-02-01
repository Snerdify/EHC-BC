// server.js
const express = require('express');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

// Ethereum blockchain interaction setup (using Infura for example)
const infuraURL = 'https://mainnet.infura.io/v3/YOUR_INFURA_API_KEY';
const contractAddress = 'CONTRACT_ADDRESS'; // Replace with your smart contract address

// Endpoint to add a new patient to the blockchain
app.post('/api/addPatient', async (req, res) => {
    try {
        const { name, medicalHistory } = req.body;

        // Connect to the Ethereum blockchain using Infura
        const response = await axios.post(`${infuraURL}`, {
            jsonrpc: '2.0',
            method: 'eth_sendTransaction',
            params: [{
                from: 'YOUR_WALLET_ADDRESS',
                to: contractAddress,
                data: '0x' + web3.utils.asciiToHex(`addPatient(string,string)`),
            }],
            id: 1,
        });

        const transactionHash = response.data.result;
        res.json({ transactionHash });
    } catch (error) {
        console.error('Error adding patient to blockchain:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Endpoint to get patient information from the blockchain
app.get('/api/getPatient/:id', async (req, res) => {
    try {
        const { id } = req.params;

        // Connect to the Ethereum blockchain using Infura
        const response = await axios.post(`${infuraURL}`, {
            jsonrpc: '2.0',
            method: 'eth_call',
            params: [{
                to: contractAddress,
                data: '0x' + web3.utils.asciiToHex(`getPatient(uint256)`),
            }],
            id: 1,
        });

        // Decode the data received from the blockchain and send it as a JSON response
        const patientData = web3.utils.hexToAscii(response.data.result);
        res.json({ patientData });
    } catch (error) {
        console.error('Error getting patient from blockchain:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
