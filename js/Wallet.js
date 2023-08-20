import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
  WagmiCore,
  WagmiCoreChains,
  WagmiCoreConnectors,
} from "https://unpkg.com/@web3modal/ethereum@2.6.2";

import { Web3Modal } from "https://unpkg.com/@web3modal/html@2.6.2";
import {
    busdAddress,
  MarketContractABI,
  MarketContractAddress,
  tokenABI,
  tokenAddress,
} from "./ContractDetails.js";
// 0. Import wagmi dependencies
const { bsc } = WagmiCoreChains;
console.log({WagmiCoreChains});
const { configureChains, createConfig, getAccount, getContract ,readContract,prepareWriteContract , writeContract} = WagmiCore;

// 1. Define chains
const chains = [bsc];
const projectId = "2aca272d18deb10ff748260da5f78bfd";

// 2. Configure wagmi client

const { publicClient } = configureChains(chains, [w3mProvider({ projectId })]);
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: [
    ...w3mConnectors({ chains, version: 2, projectId }),
    new WagmiCoreConnectors.CoinbaseWalletConnector({
      chains,
      options: {
        appName: "html wagmi example",
      },
    }),
  ],
  publicClient,
});

// 3. Create ethereum and modal clients
const ethereumClient = new EthereumClient(wagmiConfig, chains);
export const web3Modal = new Web3Modal(
  {
    projectId,
    walletImages: {
      safe: "https://pbs.twimg.com/profile_images/1566773491764023297/IvmCdGnM_400x400.jpg",
    },
  },
  ethereumClient
);
let currency=null;
let tokenPerUSD;
let account = getAccount();
async function getLatestData(){
  let price= await readContract({ address: MarketContractAddress, abi: MarketContractABI, functionName:'getLatestData', chainId:56 })
  let bnb=parseFloat(Number(price)/10**8).toFixed(4)
  return bnb
}
async function  buyWithEth() {
  if (account?.isConnected) {
    let value=document.getElementById('amount_received')?.value
    let tokenAmount=(parseInt(value)*10**18)
    let bnbAmount=(Number(document.getElementById("amount_paid")?.value)*10**18)
    let referal=document.getElementById('referal')?.value
    console.log({bnbAmount,tokenAmount,referal});
     let {hash}= await writeContract({
       address:MarketContractAddress,
       abi:MarketContractABI,
       value:bnbAmount.toString(),
      functionName:'buyWithBNB',
      chainId:56,
      args:[account?.address,tokenAmount,referal]
     })
     alert(`Transaction Successfull ${hash}`)
  }else{
    alert("Please connect wallet to buy")
  }
  // const {hash}=await writeContract({})
  
};
async function Approval(amount){
    let {hash}= await writeContract({
        address:busdAddress,
        abi:tokenABI,
       functionName:'approve',
       chainId:56,
       args:[MarketContractAddress, amount]
      })
      return true
}

async function buyWithUSDT(){
  if (account?.isConnected) {
    try {
      //let price= await readContract({ address: MarketContractAddress, abi: MarketContractABI, functionName:'usdtPrice', chainId:5 })
      let approve=await readContract({ address: busdAddress, abi:tokenABI, functionName:'allowance', chainId:56 , args:[account?.address, MarketContractAddress]})
      let referal=document.getElementById('referal')?.value
      let value=Number(document.getElementById('amount_received')?.value)*10**18
      // let Busdamount=Number(document.getElementById("amount_paid")?.value)*10**18
       console.log({approve,value});
       if (value>approve) {
           await Approval(value)
       }
       let {hash}= await writeContract({
           address:MarketContractAddress,
           abi:MarketContractABI,
          functionName:'buyTokenWithUsdt',
          chainId:5,
          args:[account?.address, value?.toString(),referal]
         })
         alert(`Transaction Successfull ${hash}`)
    } catch (error) {
      alert(error?.message)
    }
    }
    else{
      alert("Please connect wallet to buy")
    }
}
const scroll=()=>{
    let element=document.getElementById('buy_section')
    element.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" })
}
async function getPrice (){
  let price= await readContract({ address: MarketContractAddress, abi: MarketContractABI, functionName:'tokenPerUSD', chainId:56 })
  let dollar=parseFloat(1/parseInt(price)).toFixed(10)
  console.log({dollar});
  tokenPerUSD=Number(price)
  document.getElementById('current_price').innerText=`Current Price : $${dollar}`
  return price
}
getPrice()

document.getElementById("amount_paid").oninput= async function(){
  if (currency!=='bnb' && currency!=='busd') {
    document.getElementById('amount_paid').value=''
    alert('Please select a currency')
    return
  }
  console.log('callled');
  let amountReceive;
  let value=document.getElementById("amount_paid")?.value
  if (currency==='busd') {
    amountReceive=(Number(value)*tokenPerUSD).toFixed(3)
  }else{
    let bnbPrice=await getLatestData()
    let totaBnb=Number(bnbPrice)*Number(value)
    amountReceive=(totaBnb*tokenPerUSD).toFixed(3)
  }
  document.getElementById("amount_received").value=amountReceive
}
document.getElementById('bnb').onclick=function(){
  currency='bnb'
  let element=document.getElementById('bnb')
  element.style.backgroundColor="#FAD234"
  element.style.color='#2F313E'
  let element2=document.getElementById('busd')
  element2.style.backgroundColor='transparent'
  element2.style.color="#FAD234"
  document.getElementById("amount_received").value=''
  document.getElementById("amount_paid").value=''
}
document.getElementById('busd').onclick=function(){
  currency='busd'
  let element=document.getElementById('busd')
  element.style.backgroundColor="#FAD234"
  element.style.color='#2F313E'
  let element2=document.getElementById('bnb')
  element2.style.backgroundColor='transparent'
  element2.style.color="#FAD234"
  document.getElementById("amount_received").value=''
  document.getElementById("amount_paid").value=''
}
document.getElementById('scroll').addEventListener("click", scroll)
document.getElementById('buy_now_btn').onclick=function(){
  if (currency==='bnb') {
    buyWithEth()
  }else{
    buyWithUSDT()
  }
}

