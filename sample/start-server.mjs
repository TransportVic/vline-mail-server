import VLineMailServer from "../lib/index.mjs"

import vlineStations from '../test/training-messages/vline-stations.json' with { type: 'json' }
import lineStops from '../test/training-messages/line-stops.json' with { type: 'json' }

let server = new VLineMailServer(null, { vlineStations, lineStops })
server.on('error', console.error)
server.on('cancelled', service => {
  console.log('Received service cancellation! Service:', service)
})

server.on('message', (type, service, specificData) => {
  console.log(type, service, specificData)
})

server.on('non_specific', message => {
  console.log('Got non specific V/Line message! Contents:', message)
})

server.onMessage({
  subject: '',
  html: 'The 17:15 Southern Cross - Bacchus Marsh service will run at a reduced capacity of 3 VLocity carriages.'
})

server.setup()