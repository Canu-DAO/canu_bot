from web3 import Web3
from Contracts import Contracts
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
        self.contracts = Contracts().contracts

        with open('resources/name_to_id.json') as file:
            self.name_to_id = json.load(file)

    def get_latest_block(self):
        return self.w3.eth.blockNumber

    def get_logo(self, project_id, version='v1'):
        if (version == 'v1' or version == 'v1.1'):
            uri = self.contracts['v1']['projects'].functions.uriOf(project_id).call()
            logo = json.load(urllib.request.urlopen(f"https://ipfs.io/ipfs/{uri}"))['logoUri']
        else:
            logo = 'Unsupported version provided.'
        return logo

    def get_balance(self, project_id, version='v1'):
        if version == 'v2':
            return Web3.fromWei(self.contracts['v2']['payment_terminal'].functions.currentEthOverflowOf(project_id).call(), 'ether')
        elif version == 'v1.1':
            return Web3.fromWei(self.contracts['v1.1']['terminal'].functions.balanceOf(project_id).call(), 'ether')
        else:
            return Web3.fromWei(self.contracts['v1']['terminal'].functions.balanceOf(project_id).call(),  'ether')
    
    def get_overflow(self, project_id, version='v1'):
        if (version == 'v1'):
            return Web3.fromWei(self.contracts['v1']['terminal'].functions.currentOverflowOf(project_id).call(), 'ether')
    
    def get_dao_name(self, project_id, version='v1'):
        if (version == 'v1' or version == 'v1.1'):
            raw = self.contracts['v1']['projects'].functions.handleOf(project_id).call()
            raw = str(raw)[2:].split('\\')[0]
        elif (version == 'v2'):
            raw = f'Project {project_id}'
        else:
            return "Unsupported version provided."

        return raw
   
    def get_count(self, version):
        if version in ['v1', 'v1.1']:
            return self.get_countv1()
        elif version == 'v2':
            return self.get_countv2()

    def get_countv2(self):
        return self.contracts['v2']['projects'].functions.count().call()

    def get_countv1(self):
        return self.contracts['v1']['projects'].functions.count().call()

    # Funding Cycle data
    def get_raw_current_FC(self, project_id, version='v1'):
        return self.contracts['v1']['funding_cycles'].functions.currentOf(project_id).call()
    
    def get_raw_queued_FC(self, project_id, version='v1'):
        return self.contracts['v1']['funding_cycles'].functions.queuedOf(project_id).call()

    def get_cycle_start(self, project_id, version='v1'):
        raw_start = datetime.datetime.fromtimestamp(self.contracts['v1']['funding_cycles'].functions.currentOf(project_id).call()[8])
        return raw_start.strftime('%Y-%m-%d at %H:%M:%S')

    def get_cycle_end(self, project_id, version='v1'):
        if version in ['v1', 'v1.1']:
            raw_end = datetime.datetime.fromtimestamp(self.contracts['v1']['funding_cycles'].functions.queuedOf(project_id).call()[8])
            return raw_end.strftime('%Y-%m-%d at %H:%M:%S')
        else:
            return 'Unsupported version provided.'

    def get_time_left(self, project_id, version='v1'):
        if version in ['v1', 'v1.1']:
            raw_end = datetime.datetime.fromtimestamp(self.contracts['v1']['funding_cycles'].functions.queuedOf(project_id).call()[8])
            raw_left = raw_end - datetime.datetime.now()
            return raw_left
        else:
            return 'Unsupported version provided.'

    def get_cycle_target(self, project_id, version='v1'):
        return Web3.fromWei(self.contracts['v1']['funding_cycles'].functions.currentOf(project_id).call()[10], 'ether')

    def get_cycle_discount(self, project_id, version='v1'):
        return self.contracts['v1']['funding_cycles'].functions.currentOf(project_id).call()[13]

    def get_cycle_tapped(self, project_id, version='v1'):
        return Web3.fromWei(self.contracts['v1']['funding_cycles'].functions.currentOf(project_id).call()[14], 'ether')

    def get_cycle_reserved(self, project_id, version='v1'):
        return int(bin(self.contracts['v1']['funding_cycles'].functions.currentOf(project_id).call()[15])[-16:-9], 2)

    def get_cycle_bonding(self, project_id, version='v1'):
        return int(bin(self.contracts['v1']['funding_cycles'].functions.currentOf(project_id).call()[15])[-23:-17], 2)

    def get_full_balance(self, project_id, version='v1'):
        return self.get_balance(project_id) + self.get_cycle_tapped(project_id)

    # Events handlers
    def get_new_events(self, project_id, latest_block, version):
        if (version == 'v2'):
            return self.get_new_events_v2(project_id, latest_block)
        else:
            return self.get_new_events_v1(project_id, latest_block, version)

    def get_new_events_v1(self, project_id, last_block_alerted, version='v1'):

        start_block = last_block_alerted + 1  # Increment so we don't do the same block twice
        latest_block = self.w3.eth.blockNumber
        
        event_filter = []
        # Funding cycles contract events
        tap_filter =  self.contracts['v1']['funding_cycles'].events.Tap.createFilter(fromBlock=start_block, toBlock=latest_block, argument_filters={'projectId':int(project_id)})
    
        # TerminalV1 contract events
        redeem_filter =  self.contracts['v1']['terminal'].events.Redeem.createFilter(fromBlock=start_block, toBlock=latest_block, argument_filters={'_projectId':int(project_id)})
        pay_filter = self.contracts['v1']['terminal'].events.Pay.createFilter(fromBlock=start_block, toBlock=latest_block, argument_filters={'projectId':int(project_id)})

        # TerminalV1.1 contract events
        redeem1_filter =  self.contracts['v1.1']['terminal'].events.Redeem.createFilter(fromBlock=start_block, toBlock=latest_block, argument_filters={'_projectId':int(project_id)})
        pay1_filter = self.contracts['v1.1']['terminal'].events.Pay.createFilter(fromBlock=start_block, toBlock=latest_block, argument_filters={'projectId':int(project_id)})

        filters_t1   = [tap_filter, redeem_filter, pay_filter]
        filters_t1_1 = [redeem1_filter, pay1_filter]
        entries = []
        for filter in filters_t1:
            for event in filter.get_all_entries():
                entries.append(self.v1_handler(event))

        for filter in filters_t1_1:
            for event in filter.get_all_entries():
                entries.append(self.v1_handler(event))
        
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

    def get_new_events_v2(self, project_id, last_block_alerted):
        start_block = last_block_alerted + 1  # Increment so we don't do the same block twice
        latest_block = self.w3.eth.blockNumber

        pay2_filter = self.contracts['v2']['payment_terminal'].events.Pay.createFilter(fromBlock=start_block, toBlock=latest_block, argument_filters={'projectId':int(project_id)})
        tap2_filter = self.contracts['v2']['payment_terminal'].events.DistributePayouts.createFilter(fromBlock=start_block, toBlock=latest_block, argument_filters={'projectId':int(project_id)})
        redeem2_filter = self.contracts['v2']['payment_terminal'].events.RedeemTokens.createFilter(fromBlock=start_block, toBlock=latest_block, argument_filters={'projectId':int(project_id)})

        filters_t2   = [pay2_filter, tap2_filter, redeem2_filter]

        entries = []

        for filter in filters_t2:
            for event in filter.get_all_entries():
                print(event.args)
                entries.append(self.v2_handler(event))
        
        return entries, latest_block

    def v2_handler(self, event):
        event_caller = (self.ns.name(event.args.caller) or event.args.caller)
        
        if (event.event == 'Pay'):
            eth_value = Web3.fromWei(event.args.amount, 'ether')
            _note = event.args.memo
            info = ['pay', event_caller, eth_value, _note, 'v2']

        elif(event.event == 'Redeem'):
            _ticket_count = event.args.amount
            eth_value = Web3.fromWei(event.args.refundedFees, 'ether')
            info = ['redeem', event_caller, eth_value, _ticket_count, 'v2']
                
        elif(event.event == 'DistributePayouts'):
            eth_value = Web3.fromWei(event.args.amount, 'ether')
            tapped_amount = Web3.fromWei(event.args.distributedAmount, 'ether')
            info = ['tap', event_caller, eth_value, tapped_amount, 'v2']
            
        return info