from JuiceboxReader import JuiceboxReader
from Contracts import Contracts
from pprint import pprint

JBR = JuiceboxReader()

#pprint(JBR.contracts['v2']['directory'].all_functions())

jb = JBR.contracts

project_fucntions = jb['v2']['projects'].functions
directory_functions = jb['v2']['directory'].functions
controller_functions = jb['v2']['controller'].functions

v2_counter = project_fucntions.count().call()

# for i in range(v2_counter):
#     printable = controller_functions.latestConfiguredFundingCycleOf(i).call()
#     pprint(printable)

directory = directory_functions.terminalsOf(39).call()
pprint(JBR.get_new_events_v2(39, 14890700))
#pprint(jb['v2']['controller'].all_functions())
#pprint(jb['v2']['controller'].functions.projects())
#pprint(controller_functions.currentFundingCycleOf(39).call())