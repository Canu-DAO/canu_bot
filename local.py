from web3 import Web3
import json
import datetime
import asyncio
import time

# add your blockchain connection information
infura_url = 'https://mainnet.infura.io/v3/98469dd384934368a686fd6818f97182'
w3 = Web3(Web3.HTTPProvider(infura_url))

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
projects = w3.eth.contract(projects_address, abi = projects_abi)
terminal = w3.eth.contract(terminal_address, abi = terminal_abi)
funding_cycles = w3.eth.contract(funding_cycles_address, abi = funding_cycles_abi)




# define function to handle events and print to the console
def handle_event(event):
    event = json.loads(Web3.toJSON(event))
    if (event['event'] == 'Tap'):
        handle_tap(event)
    if (event['event'] == 'Redeem'):
        handle_redeem(event)
    if (event['event'] == 'Pay'):
        handle_deposit(event)

def handle_tap(event):
    print(f"{event['event']}: \n{event['args']}\n")
    # and whatever

def handle_redeem(event):
    print(f"{event['event']}: \n{event['args']}\n")

def handle_deposit(event):
    print(f"New {event['event']}: \n{event['args']}\n")


# asynchronous defined function to loop
# this loop sets up an event filter and is looking for new entires for the "PairCreated" event
# this loop runs on a poll interval
def log_loop(event_filter, poll_interval):
    while True:
        for filter in event_filter:
            for event in filter.get_all_entries():
                handle_event(event)
        time.sleep(poll_interval)

# when main is called
# create a filter for the latest block and look for the "PairCreated" event for the uniswap factory contract
# run an async loop
# try to run the log_loop function above every 2 seconds
def main():
    latest = w3.eth.blockNumber
    earliest = latest - latest

    event_filter = []
    tap_filter =  funding_cycles.events.Tap.createFilter(fromBlock=earliest, toBlock=latest)
    redeem_filter =  terminal.events.Redeem.createFilter(fromBlock=earliest, toBlock='latest')

    ids = [1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 13, 14, 15]
    pay_filter = terminal.events.Pay.createFilter(fromBlock=earliest, toBlock='latest', argument_filters={'projectId':ids})

    event_filter = [tap_filter, redeem_filter, pay_filter]
    log_loop(event_filter, 2)




if __name__ == "__main__":
    main()