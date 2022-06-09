from web3 import Web3
import json, datetime, urllib.request, os
from ens import ENS
from dotenv import load_dotenv
import copy

class JuiceboxReader:

    def __init__(self):
        load_dotenv()
        self.w3 = Web3(Web3.HTTPProvider(os.environ["INFURA_URL"]))
        self.ns = ENS.fromWeb3(self.w3)
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

        # V2.0 tests
        #0x7Ae63FBa045Fec7CaE1a75cF7Aa14183483b8397
        with open('contracts/PaymentTerminal2.abi.json') as abi_json:
            payment_terminal_2_abi = json.load(abi_json)
        payment_terminal_2_address = '0x7Ae63FBa045Fec7CaE1a75cF7Aa14183483b8397'
        payment_terminal_2_address = Web3.toChecksumAddress(payment_terminal_2_address)
            
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
        self.projects = self.w3.eth.contract(projects_address, abi = projects_abi)
        self.terminal = self.w3.eth.contract(terminal_address, abi = terminal_abi)
        self.terminal1 = self.w3.eth.contract(terminal1_1_address, abi = terminal1_1_abi)
        self.funding_cycles = self.w3.eth.contract(funding_cycles_address, abi = funding_cycles_abi)
        self.prices = self.w3.eth.contract(prices_addr, abi = prices_abi)
        self.payment_terminal2 = self.w3.eth.contract(payment_terminal_2_address, abi=payment_terminal_2_abi)

        with open('resources/name_to_id.json') as file:
            self.name_to_id = json.load(file)

    def get_latest_block(self):
        return self.w3.eth.blockNumber

    def get_logo(self, project_id):
        uri = self.projects.functions.uriOf(project_id).call()
        return json.load(urllib.request.urlopen(f"https://ipfs.io/ipfs/{uri}"))['logoUri']
        
    def id_from_name(self, project_name):
        return self.name_to_id[project_name]

    def get_balance(self, project_id, version):
        if version == 'v2':
            return Web3.fromWei(self.payment_terminal2.functions.currentEthOverflowOf(project_id).call(), 'ether')
        elif version == 'v11':
            return Web3.fromWei(self.terminal1.functions.balanceOf(project_id).call(), 'ether')
        else:
            return Web3.fromWei(self.terminal.functions.balanceOf(project_id).call(),  'ether')
    
    def get_overflow(self, project_id):
        return Web3.fromWei(self.terminal.functions.currentOverflowOf(project_id).call(), 'ether')
    
    def get_dao_name(self, project_id):
        raw = self.projects.functions.handleOf(project_id).call()
        raw = str(raw)[2:].split('\\')[0]
        return raw
    
    def get_count(self):
        return self.projects.functions.count().call()

    # Funding Cycle data
    def get_raw_current_FC(self, project_id):
        return self.funding_cycles.functions.currentOf(project_id).call()
    
    def get_raw_queued_FC(self, project_id):
        return self.funding_cycles.functions.queuedOf(project_id).call()

    def get_cycle_start(self, project_id):
        raw_start = datetime.datetime.fromtimestamp(self.funding_cycles.functions.currentOf(project_id).call()[8])
        return raw_start.strftime('%Y-%m-%d at %H:%M:%S')

    def get_cycle_end(self, project_id):
        raw_end = datetime.datetime.fromtimestamp(self.funding_cycles.functions.queuedOf(project_id).call()[8])
        return raw_end.strftime('%Y-%m-%d at %H:%M:%S')

    def get_time_left(self, project_id):
        raw_end = datetime.datetime.fromtimestamp(self.funding_cycles.functions.queuedOf(project_id).call()[8])
        raw_left = raw_end - datetime.datetime.now()
        return raw_left

    def get_cycle_target(self, project_id):
        return Web3.fromWei(self.funding_cycles.functions.currentOf(project_id).call()[10], 'ether')

    def get_cycle_discount(self, project_id):
        return self.funding_cycles.functions.currentOf(project_id).call()[13]

    def get_cycle_tapped(self, project_id):
        return Web3.fromWei(self.funding_cycles.functions.currentOf(project_id).call()[14], 'ether')

    def get_cycle_reserved(self, project_id):
        return int(bin(self.funding_cycles.functions.currentOf(project_id).call()[15])[-16:-9], 2)

    def get_cycle_bonding(self, project_id):
        return int(bin(self.funding_cycles.functions.currentOf(project_id).call()[15])[-23:-17], 2)

    def get_full_balance(self, project_id):
        return self.get_balance(project_id) + self.get_cycle_tapped(project_id)

    
    def get_new_events_v1(self, project_id, last_block_alerted):
        #start_block = last_block_alerted + 1  # Increment so we don't do the same block twice
        start_block = 14890700
        latest_block = self.w3.eth.blockNumber
        
        event_filter = []
        # Funding cycles contract events
        tap_filter =  self.funding_cycles.events.Tap.createFilter(fromBlock=start_block, toBlock=latest_block, argument_filters={'projectId':int(project_id)})
    
        # TerminalV1 contract events
        redeem_filter =  self.terminal.events.Redeem.createFilter(fromBlock=start_block, toBlock=latest_block, argument_filters={'_projectId':int(project_id)})
        pay_filter = self.terminal.events.Pay.createFilter(fromBlock=start_block, toBlock=latest_block, argument_filters={'projectId':int(project_id)})

        # TerminalV1.1 contract events
        redeem1_filter =  self.terminal1.events.Redeem.createFilter(fromBlock=start_block, toBlock=latest_block, argument_filters={'_projectId':int(project_id)})
        pay1_filter = self.terminal1.events.Pay.createFilter(fromBlock=start_block, toBlock=latest_block, argument_filters={'projectId':int(project_id)})

        # TerminalV2.0 events
        pay2_filter = self.payment_terminal2.events.Pay.createFilter(fromBlock=start_block, toBlock=latest_block, argument_filters={'projectId':int(project_id)})

        filters_t1   = [tap_filter, redeem_filter, pay_filter]
        filters_t1_1 = [redeem1_filter, pay1_filter]
        filters_t2   = [pay2_filter]

        entries = []

        for filter in filters_t1:
            for event in filter.get_all_entries():
                entries.append(self.v1_handler(event))

        for filter in filters_t1_1:
            for event in filter.get_all_entries():
                entries.append(self.v1_handler(event))

        for filter in filters_t2:
            for event in filter.get_all_entries():
                entries.append(self.v2_handler(event))
        
        return entries, latest_block

    def v1_handler(self, event):
        event_caller = (self.ns.name(event.args.caller) or event.args.caller)
            
        if (event.event == 'Pay'):
            eth_value = Web3.fromWei(event.args.amount, 'ether')
            _note = event.args.note
            info = ['pay', event_caller, eth_value, _note, 'v1']

        elif(event.event == 'Redeem'):
            _ticket_count = event.args.amount
            eth_value = Web3.fromWei(event.args.returnAmount, 'ether')
            info = ['redeem', event_caller, eth_value, _ticket_count, 'v1']
                
        elif(event.event == 'Tap'):
            eth_value = Web3.fromWei(event.args.amount, 'ether')
            tapped_amount = Web3.fromWei(event.args.newTappedAmount, 'ether')
            info = ['tap', event_caller, eth_value, tapped_amount, 'v1']
            
        return info

    def v11_handler(self, event):
        event_caller = (self.ns.name(event.args.caller) or event.args.caller)
            
        if (event.event == 'Pay'):
            eth_value = Web3.fromWei(event.args.amount, 'ether')
            _note = event.args.note
            info = ['pay', event_caller, eth_value, _note, 'v11']

        elif(event.event == 'Redeem'):
            _ticket_count = event.args.amount
            eth_value = Web3.fromWei(event.args.returnAmount, 'ether')
            info = ['redeem', event_caller, eth_value, _ticket_count, 'v11']
                
        elif(event.event == 'Tap'):
            eth_value = Web3.fromWei(event.args.amount, 'ether')
            tapped_amount = Web3.fromWei(event.args.newTappedAmount, 'ether')
            info = ['tap', event_caller, eth_value, tapped_amount, 'v11']
            
        return info

    def get_new_events_v1(self, project_id, last_block_alerted):
        #start_block = last_block_alerted + 1  # Increment so we don't do the same block twice
        start_block = 14890700
        latest_block = self.w3.eth.blockNumber

        pay2_filter = self.payment_terminal2.events.Pay.createFilter(fromBlock=start_block, toBlock=latest_block, argument_filters={'projectId':int(project_id)})

        filters_t2   = [pay2_filter]

        entries = []

        for filter in filters_t2:
            for event in filter.get_all_entries():
                entries.append(self.v2_handler(event))
        
        return entries, latest_block

    def v2_handler(self, event):
        event_caller = (self.ns.name(event.args.caller) or event.args.caller)
            
        if (event.event == 'Pay'):
            eth_value = Web3.fromWei(event.args.amount, 'ether')
            _note = event.args.memo
            info = ['pay', event_caller, eth_value, _note, 'v2']

        #elif(event.event == 'Redeem'):
        #    _ticket_count = event.args.amount
        #    eth_value = Web3.fromWei(event.args.returnAmount, 'ether')
        #    info = ['redeem', event_caller, eth_value, _ticket_count, 'v2']
                
        #elif(event.event == 'Tap'):
        #    eth_value = Web3.fromWei(event.args.amount, 'ether')
        #    tapped_amount = Web3.fromWei(event.args.newTappedAmount, 'ether')
        #    info = ['tap', event_caller, eth_value, tapped_amount, 'v2']
            
        return info