import json
from web3 import Web3
from web3 import HTTPProvider
from web3.contract.contract import Contract
from web3.middleware.geth_poa import geth_poa_middleware
from eth_account.signers.local import LocalAccount

TOKEN_CONTRACT  = "0x5FbDB2315678afecb367f032d93F642f64180aa3"
STAKING_CONTRACT = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"

TARGET_ADDRESS = "0x70997970C51812dc3A010C7d01b50e0d17dc79C8"

class Deposit:
    def __init__(self) -> None:
        self.provider = Web3(
            HTTPProvider("http://localhost:8545")
        )
        # self.provider.middleware_onion.inject(geth_poa_middleware)

        self.TOKEN_ABI = []
        self.STAKING_ABI = []

        self.read_abi_files()

        self.token_contract: Contract = None
        self.staking_contract: Contract = None

        self.build_contract()

    def info(self):
        lastBlockNumber = self.provider.eth.get_block_number()
        chainId = self.provider.eth.chain_id

        print (f"Last Block Number: {lastBlockNumber}")
        print (f"Chain ID: {chainId}")

    def owner(self) -> LocalAccount:
        account: LocalAccount = self.provider.eth.account.from_key("0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80")
        return account

    def target(self) -> LocalAccount:
        account: LocalAccount = self.provider.eth.account.from_key("0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d")
        return account

    def build_contract(self):
        self.token_contract = self.provider.eth.contract(TOKEN_CONTRACT, abi=self.TOKEN_ABI)
        self.staking_contract = self.provider.eth.contract(STAKING_CONTRACT, abi=self.STAKING_ABI)

    def read_abi_files(self):
        with open("artifacts/token.json", "r") as TokenArtifactFile:
            data = json.loads(TokenArtifactFile.read())
            TokenArtifactFile.close()
            self.TOKEN_ABI = data['abi']
        with open("artifacts/staking.json", "r") as StakingArtifactFile:
            data = json.loads(StakingArtifactFile.read())
            StakingArtifactFile.close()
            self.STAKING_ABI = data['abi']

    def get_token_balance(self, target: str):
        balance = self.token_contract.functions.balanceOf(target).call()
        balance_ether = self.provider.from_wei(balance, "ether")
        print (f"Balance: {balance_ether}")

    def send_token(self, target: str, amount: str):
        nonce = self.provider.eth.get_transaction_count(self.owner().address)
        token_amount =self.provider.to_wei(amount, "ether")
        transaction = self.token_contract.functions.transfer(target, token_amount).build_transaction({
            "chainId": self.provider.eth.chain_id,
            "gas": 2000000,
            "nonce": nonce
        })
        signed_tx = self.provider.eth.account.sign_transaction(transaction, self.owner().key)
        tx_hash = self.provider.eth.send_raw_transaction(signed_tx.rawTransaction)
        print (f"Send token tx: {tx_hash.hex()}")

    def totalStaked(self):
        data = self.staking_contract.functions.totalStaked().call()
        print (f"Total staked: {data}")

    def allowance(self):
        data = self.token_contract.functions.allowance(self.target().address, STAKING_CONTRACT).call()
        print (f"Allowance: {data}")

    def approve(self, target: str, priv: str):
        nonce = self.provider.eth.get_transaction_count(target)
        transaction = self.token_contract.functions.approve(STAKING_CONTRACT, 115792089237316195423570985008687907853269984665640564039457583608073506868731).build_transaction({
            "chainId": self.provider.eth.chain_id,
            "nonce": nonce,
            "gas": 2000000
        })
        signed_tx = self.provider.eth.account.sign_transaction(transaction, priv)
        tx_hash = self.provider.eth.send_raw_transaction(signed_tx.rawTransaction)
        print (f"Approve tx: {tx_hash.hex()}")

    def get_staking_token(self):
        stakingToken = self.staking_contract.functions.stakingToken().call()
        print (f"Staking Token: {stakingToken}")

    def deposit(self, amount: str):
        nonce = self.provider.eth.get_transaction_count(self.target().address)
        token_amount = self.provider.to_wei(amount, "ether")
        transaction = self.staking_contract.functions.deposit(token_amount).build_transaction({
            "chainId": self.provider.eth.chain_id,
            "gas": 2000000,
            "nonce": nonce
        })
        signed_tx = self.provider.eth.account.sign_transaction(transaction, self.target().key)
        tx_hash = self.provider.eth.send_raw_transaction(signed_tx.rawTransaction)
        print (f"Deposit tx: {tx_hash.hex()}")

    def withdraw(self):
        nonce = self.provider.eth.get_transaction_count(self.target().address)
        transaction = self.staking_contract.functions.emergencyWithdraw().build_transaction({
            "chainId": self.provider.eth.chain_id,
            "gas": 2000000,
            "nonce": nonce
        })
        signed_tx = self.provider.eth.account.sign_transaction(transaction, self.target().key)
        tx_hash = self.provider.eth.send_raw_transaction(signed_tx.rawTransaction)
        print (f"Withdraw: {tx_hash.hex()}")

if __name__ == "__main__":
    deposit = Deposit()
    deposit.info()
    deposit.get_staking_token()
    deposit.get_token_balance(deposit.target().address)
    deposit.totalStaked()
    deposit.allowance()
    deposit.approve(deposit.target().address, deposit.target().key)
    deposit.allowance()
    # deposit.deposit(10000)
    # deposit.withdraw()
    deposit.send_token(TARGET_ADDRESS, 100000)
    deposit.totalStaked()
    deposit.get_token_balance(deposit.target().address)