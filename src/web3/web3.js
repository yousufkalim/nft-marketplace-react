import Web3 from 'web3'
import CreateCollectionForm from "\..CreateCollection"


export const getWeb3 = async () => {
    let instance;
    const web = new Web3();
    if (window.ethereum) {
        await window.web3.currentProvider.enable();
        instance = new Web3(window.web3.currentProvider);
        web.eth.net.isListening()
        .then(() => console.log('Provider is connected'))
        .catch(e => console.log('Wow. Something went wrong: '+ e));
    } else {
        instance = new Web3('http://localhost:7545');
    }
    return instance;
};

export const getSigner = async () => {
    let web3 = await getWeb3();
    const signer = web3.getSigner();
    return signer;
};

export const getContractMethods = async (abiJson, contract) => {
    // console.log(contract, 'contract');
    let web3 = await getWeb3();
    const contractM = new web3.eth.Contract(abiJson, contract);
    return contractM;
};

export const getChainId = async () => {
    if (window.ethereum) {
        let web3 = await getWeb3();
        let chainId = await web3.eth.getChainId();
        return chainId;
    }
};

export const switchNetworkToChainId = async (id) => {
    if (window.ethereum) {
        try {
            let web3 = await getWeb3();
            await web3.currentProvider.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: Web3.utils.toHex(id) }],
            });
            let accounts = await web3.eth.getAccounts();
            return accounts[0];
        } catch (err) {
            toast.error(err.message);
            throw new Error(err);
        }
    }
};
