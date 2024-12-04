import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import PortfolioManager from "./contracts/PortfolioManager.json";

const App = () => {
    const [provider, setProvider] = useState(null);
    const [contract, setContract] = useState(null);
    const [portfolios, setPortfolios] = useState([]);
    const [newPortfolio, setNewPortfolio] = useState({ name: "", assets: [], holdings: [] });

    useEffect(() => {
        const loadBlockchainData = async () => {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            setProvider(provider);

            const signer = provider.getSigner();
            const contract = new ethers.Contract(
                "YOUR_CONTRACT_ADDRESS",
                PortfolioManager.abi,
                signer
            );
            setContract(contract);

            const portfolios = await contract.getPortfolios();
            setPortfolios(portfolios);
        };
        loadBlockchainData();
    }, []);

    const createPortfolio = async () => {
        const { name, assets, holdings } = newPortfolio;
        await contract.createPortfolio(name, assets, holdings);
        alert("Portfolio created successfully!");
    };

    return (
        <div>
            <h1>CryptoScope</h1>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    createPortfolio();
                }}
            >
                <input
                    type="text"
                    placeholder="Portfolio Name"
                    onChange={(e) => setNewPortfolio({ ...newPortfolio, name: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Assets (comma separated)"
                    onChange={(e) =>
                        setNewPortfolio({ ...newPortfolio, assets: e.target.value.split(",") })
                    }
                />
                <input
                    type="text"
                    placeholder="Holdings (comma separated)"
                    onChange={(e) =>
                        setNewPortfolio({ ...newPortfolio, holdings: e.target.value.split(",") })
                    }
                />
                <button type="submit">Create Portfolio</button>
            </form>
            <h2>Your Portfolios</h2>
            <ul>
                {portfolios.map((portfolio, index) => (
                    <li key={index}>
                        <h3>{portfolio.name}</h3>
                        <p>Assets: {portfolio.assets.join(", ")}</p>
                        <p>Holdings: {portfolio.holdings.join(", ")}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default App;
