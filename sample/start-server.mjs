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

console.log(server.onMessage({
  subject: '',
  html: 'The 17:15 Southern Cross - Bacchus Marsh service will run at a reduced capacity of 3 VLocity carriages.\n More information at vline.com.au   VLine & PTV Logo   You are receiving this email because your email address is registered at vline.com.au/inform.  To unsubscribe or update your contact/journey details, visit vline.com.au/login.  For general travel information please call 1800 800 007 or visit vline.com.au.  For weekly updates about planned service changes across the public transport network, subscribe to PTV\'s weekly travel update.'
}))

server.setup()