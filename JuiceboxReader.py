from web3 import Web3
import json
import datetime

class JuiceboxReader:

    def __init__(self):
        ### Contracts setup
        # ABIs
        self.w3 = Web3(Web3.HTTPProvider('https://mainnet.infura.io/v3/98469dd384934368a686fd6818f97182'))
        project_id = 1
        with open('contracts/Projects.abi.json') as abi_json:
            projects_abi = json.load(abi_json)

        with open('contracts/TerminalV1.abi.json') as abi_json:
            terminal_abi = json.load(abi_json)

        with open('contracts/FundingCycles.abi.json') as abi_json:
            funding_cycles_abi = json.load(abi_json)

        with open('contracts/Prices.abi.json') as abi_json:
            prices_abi = json.load(abi_json)

            
        # Addresses
        projects_address = '0x9b5a4053FfBB11cA9cd858AAEE43cc95ab435418'
        projects_address = Web3.toChecksumAddress(projects_address)

        terminal_address = '0xd569D3CCE55b71a8a3f3C418c329A66e5f714431'
        terminal_address = Web3.toChecksumAddress(terminal_address)

        funding_cycles_address = '0xf507B2A1dD7439201eb07F11E1d62AfB29216e2E'
        funding_cycles_address = Web3.toChecksumAddress(funding_cycles_address)

        prices_addr = '0xa9537Cc42555564206D4E57c0eb6943d56E83A30'
        prices_addr = Web3.toChecksumAddress(prices_addr)

        # Adding contracts
        self.projects = self.w3.eth.contract(projects_address, abi = projects_abi)
        self.terminal = self.w3.eth.contract(terminal_address, abi = terminal_abi)
        self.funding_cycles = self.w3.eth.contract(funding_cycles_address, abi = funding_cycles_abi)
        self.prices = self.w3.eth.contract(prices_addr, abi = prices_abi)

        with open('resources/name_to_id.json') as file:
            self.name_to_id = json.load(file)

    def get_latest_block(self):
        return self.w3.eth.blockNumber


    # Dao data
    def id_from_name(self, project_name):
        return self.name_to_id[project_name]

    def get_balance(self, project_id):
        return Web3.fromWei(self.terminal.functions.balanceOf(project_id).call(), 'ether')
    
    def get_overflow(self, project_id):
        return Web3.fromWei(self.terminal.functions.currentOverflowOf(project_id).call(), 'ether')
    
    def get_dao_name(self, project_id):
        raw = self.projects.functions.handleOf(project_id).call()
        raw = str(raw)[2:].split('\\')[0]
        return raw

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

    def start_events(self):
        latest = self.w3.eth.blockNumber
        earliest = latest - 1

        for project_id in range(1, self.projects.functions.count().call()):
            tap_filter =  self.funding_cycles.events.Tap.createFilter(fromBlock=earliest, toBlock=latest, argument_filters={'projectId':int(project_id)})
            redeem_filter =  self.terminal.events.Redeem.createFilter(fromBlock=earliest, toBlock=latest, argument_filters={'_projectId':int(project_id)})
            pay_filter = self.terminal.events.Pay.createFilter(fromBlock=earliest, toBlock=latest, argument_filters={'projectId':int(project_id)})
            event_filter = [tap_filter, redeem_filter, pay_filter]
            
            for filter in event_filter:
                filter.get_all_entries()
        print('All set-up')


    def get_new_events(self, project_id, last_block_alerted):
        print(f'Checking events for: {project_id}')
        start_block = last_block_alerted + 1  # Increment so we don't do the same block twice
        latest_block = self.w3.eth.blockNumber
        
        event_filter = []
        tap_filter =  self.funding_cycles.events.Tap.createFilter(fromBlock=start_block, toBlock=latest_block, argument_filters={'projectId':int(project_id)})
        redeem_filter =  self.terminal.events.Redeem.createFilter(fromBlock=start_block, toBlock=latest_block, argument_filters={'_projectId':int(project_id)})
        pay_filter = self.terminal.events.Pay.createFilter(fromBlock=start_block, toBlock=latest_block, argument_filters={'projectId':int(project_id)})
        event_filter = [tap_filter, redeem_filter, pay_filter]

        entries = []
        for filter in event_filter:
            for event in filter.get_all_entries():
                _event =  event = json.loads(Web3.toJSON(event))
                _event_caller = _event['args']['caller']
                if (_event['event'] == 'Pay'):
                    eth_value = Web3.fromWei(_event['args']['amount'], 'ether')
                    entries += [f"A payment of ETH{eth_value} has just been made by {_event_caller}."]

                elif(_event['event'] == 'Redeem'):
                    _ticket_count = _event['args']['amount']
                    eth_value = Web3.fromWei(_event['args']['returnAmount'], 'ether')
                    entries += [f"{_event_caller} has just redeemed {_ticket_count} for ETH{eth_value}."]
                
                elif(_event['event'] == 'Tap'):
                    eth_value = Web3.fromWei(_event['args']['amount'], 'ether')
                    tapped_amount = Web3.fromWei(_event['args']['newTappedAmount'], 'ether')
                    entries += [f"{eth_value} has just been distributed from our treasury. The total distributed amount for this funding cycle is {tapped_amount}."]
        return entries, latest_block