from web3 import Web3
import json, datetime, urllib.request, os
from dotenv import load_dotenv

class Contracts:
    def __init__(self):
        load_dotenv()
        self.w3 = Web3(Web3.HTTPProvider(os.environ["INFURA_URL"]))
        self.contracts = {}
        ### Contracts setup
        # ABIs
        with open('contracts/Projects.abi.json') as abi_json:
            projects_abi = json.load(abi_json)

        with open('contracts/TerminalV1.abi.json') as abi_json:
            terminal_abi = json.load(abi_json)

        with open('contracts/TerminalV1_1.abi.json') as abi_json:
            terminal1_1_abi = json.load(abi_json)

        with open('contracts/FundingCycles.abi.json') as abi_json:
            funding_cycles_abi = json.load(abi_json)

        with open('contracts/Prices.abi.json') as abi_json:
            prices_abi = json.load(abi_json)

        # V2.0 ABIs
        with open('contracts/PaymentTerminal2.abi.json') as abi_json:
            payment_terminal_2_abi = json.load(abi_json)

        with open('contracts/ProjectsV2.abi.json') as abi_json:
            projects_2_abi = json.load(abi_json)

        with open('contracts/PricesV2.abi.json') as abi_json:
            prices_2_abi = json.load(abi_json)

        with open('contracts/DirectoryV2.abi.json') as abi_json:
            directory_2_abi = json.load(abi_json)

        with open('contracts/FundingCyclesV2.abi.json') as abi_json:
            funding_cycles_2_abi = json.load(abi_json)

        with open('contracts/ControllerV2.abi.json') as abi_json:
            controller_2_abi = json.load(abi_json)

        # V2 Addresses
        payment_terminal_2_address = '0x7Ae63FBa045Fec7CaE1a75cF7Aa14183483b8397'
        payment_terminal_2_address = Web3.toChecksumAddress(payment_terminal_2_address)
            
        projects_2_address = '0xD8B4359143eda5B2d763E127Ed27c77addBc47d3'
        projects_2_address = Web3.toChecksumAddress(projects_2_address)

        prices_2_address = '0xCDE93bdA2a706Fc652F7e75241bA949aCB9f4Fe5'
        prices_2_address = Web3.toChecksumAddress(prices_2_address)

        directory_2_address = '0xCc8f7a89d89c2AB3559f484E0C656423E979ac9C'
        directory_2_address = Web3.toChecksumAddress(directory_2_address)

        controller_2_address = '0x4e3ef8AFCC2B52E4e704f4c8d9B7E7948F651351'
        controller_2_address = Web3.toChecksumAddress(controller_2_address)

        funding_cycles_2_address = '0x6B8e01DAA8A61b544F96d2738893E05D04BF1D12'
        funding_cycles_2_address = Web3.toChecksumAddress(funding_cycles_2_address)              



        # Addresses
        projects_address = '0x9b5a4053FfBB11cA9cd858AAEE43cc95ab435418'
        projects_address = Web3.toChecksumAddress(projects_address)

        terminal_address = '0xd569D3CCE55b71a8a3f3C418c329A66e5f714431'
        terminal_address = Web3.toChecksumAddress(terminal_address)

        terminal1_1_address = '0x981c8ECD009E3E84eE1fF99266BF1461a12e5c68'
        terminal1_1_address = Web3.toChecksumAddress(terminal1_1_address)

        funding_cycles_address = '0xf507B2A1dD7439201eb07F11E1d62AfB29216e2E'
        funding_cycles_address = Web3.toChecksumAddress(funding_cycles_address)

        prices_addr = '0xa9537Cc42555564206D4E57c0eb6943d56E83A30'
        prices_addr = Web3.toChecksumAddress(prices_addr)

        # Adding contracts
        self.contracts['v1'] = {
            'projects':         self.w3.eth.contract(projects_address, abi = projects_abi),
            'terminal':         self.w3.eth.contract(terminal_address, abi = terminal_abi),
            'funding_cycles':   self.w3.eth.contract(funding_cycles_address, abi = funding_cycles_abi),
            'prices':           self.w3.eth.contract(prices_addr, abi = prices_abi),
        }
        
        self.contracts['v1.1'] = {
            'projects':         self.w3.eth.contract(projects_address, abi = projects_abi),
            'terminal1':        self.w3.eth.contract(terminal1_1_address, abi = terminal1_1_abi),
            'funding_cycles':   self.w3.eth.contract(funding_cycles_address, abi = funding_cycles_abi),
            'prices':           self.w3.eth.contract(prices_addr, abi = prices_abi),

        }

        self.contracts['v2'] = {
            'payment_terminal': self.w3.eth.contract(payment_terminal_2_address, abi=payment_terminal_2_abi),
            'projects':         self.w3.eth.contract(projects_2_address, abi=projects_2_abi),
            'prices':           self.w3.eth.contract(prices_2_address, abi=prices_2_abi),
            'directory':        self.w3.eth.contract(directory_2_address, abi=directory_2_abi),
            'controller':       self.w3.eth.contract(controller_2_address, abi=controller_2_abi),
            'funding_cycles':   self.w3.eth.contract(funding_cycles_2_address, abi=funding_cycles_2_abi),
        }
