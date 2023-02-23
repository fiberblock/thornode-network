import requests
import json
from common import commitQuery, grabQuery
from multiprocessing import Queue

import time
from threading import Thread

def requestThread(data, Queue):
    """
    requestThread thread to grab p2p id and health of a given node

    :param data: node to grab info for
    :param Queue: queue to push output too
    """
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
            #catch all exceptions from this thread and return without writing to the queue, results in data not
            #being updated for this node.
            return


def biFrostGrabDataAndSaveToDB():
    """
    biFrostGrabDataAndSaveToDB used to update rpc and bifrost info in thornode_monitor
    """
    responseQueue = Queue()
    currentDBData = (grabQuery('SELECT * FROM noderunner.thornode_monitor'))
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
        query = "UPDATE noderunner.thornode_monitor SET " \
                "rpc = '{rpc}', bifrost = '{bifrost}' " \
                "WHERE (node_address = '{address}');".format(rpc=json.dumps(resp['rpc']),bifrost=resp['bifrost'],address=resp['node_address'])

        commitQuery(query)
