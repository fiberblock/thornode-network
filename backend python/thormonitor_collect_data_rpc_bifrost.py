import requests
import json
from common import commitQuery, grabQuery
from multiprocessing import Queue

import time
from threading import Thread

def requestThread(data, Queue):
    if data['ip_address'] != '':
        bifrostURL = "http://" + data['ip_address'] + ":6040/p2pid"
        healthUrl = "http://" + data['ip_address'] + ":27147/health?"
        bifrost = ""
        health = ""

        try:
            state = requests.get(bifrostURL, timeout=2)
            if state.status_code == 200:
                bifrost = (state.text)
            state = requests.get(healthUrl, timeout=2)
            if state.status_code == 200:
                health = (json.loads(state.text))

            dataReturn = {'node_address': data['node_address'], 'bifrost': bifrost, 'rpc': health,
                          'bifrostURL': bifrostURL, 'healthURL': healthUrl}
            Queue.put(dataReturn)
        except Exception as e:
            return


def biFrostGrabDataAndSaveToDB():
    responseQueue = Queue()
    currentDBData = (grabQuery('SELECT * FROM noderunner.thornode_monitor'))
    fullAddrList = [x['node_address'] for x in currentDBData]
    currentAddrList = []
    threads = list()
    for node in currentDBData:
        # print("create and start thread ", str(index))
        x = Thread(target=requestThread,
                   args=(node, responseQueue))
        threads.append(x)

    for index, thread in enumerate(threads):
        thread.start()
        if index % 20 == 0:
            time.sleep(3)

    for index, thread in enumerate(threads):
        thread.join()

    while not responseQueue.empty():
        resp = responseQueue.get()
        currentAddrList.append(resp['node_address'])
        if len(resp['rpc']['result'] == 0):
            query = "UPDATE noderunner.thornode_monitor SET " \
                    "rpc = '{rpc}', bifrost = '{bifrost}' " \
                    "WHERE (node_address = '{address}');".format(rpc=json.dumps(resp['rpc']),bifrost=resp['bifrost'],address=resp['node_address'])

            commitQuery(query)
        else:
            #rpc has an error so report as bad
            query = "UPDATE noderunner.thornode_monitor SET " \
                    "rpc = '{rpc}', bifrost = '{bifrost}' " \
                    "WHERE (node_address = '{address}');".format(rpc="null", bifrost=resp['bifrost'],
                                                                 address=resp['node_address'])

            commitQuery(query)

    newList = list(set(fullAddrList).symmetric_difference(set(currentAddrList)))

    for node in newList:
        query = "UPDATE noderunner.thornode_monitor SET " \
                "rpc = '{rpc}', bifrost = '{bifrost}' " \
                "WHERE (node_address = '{address}');".format(rpc="null", bifrost="null",
                                                             address=node)

        commitQuery(query)