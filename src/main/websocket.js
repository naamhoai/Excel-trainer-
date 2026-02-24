import { WebSocketServer } from 'ws'

let wss
const qrSessions = new Map()

export function startWebSocketServer(port = 8080) {
  wss = new WebSocketServer({ port })

  wss.on('error', (error) => {
    console.error(`WebSocket Server Error on port ${port}:`, error.message)
  })

  wss.on('connection', (ws) => {
    console.log('Client connected')

    ws.on('message', (message) => {
      try {
        const data = JSON.parse(message.toString())
        
        if (data.type === 'qr-scan') {
          qrSessions.set(data.sessionId, { ws, status: 'scanned', userData: data.userData })
          wss.clients.forEach((client) => {
            if (client.readyState === 1 && client !== ws) {
              client.send(JSON.stringify({ type: 'qr-auth-success', sessionId: data.sessionId, user: data.userData }))
            }
          })
        }
        
        if (data.type === 'qr-check') {
          const session = qrSessions.get(data.sessionId)
          if (session && session.status === 'scanned') {
            ws.send(JSON.stringify({ type: 'qr-auth-success', user: session.userData }))
            qrSessions.delete(data.sessionId)
          }
        }
      } catch (e) {
        console.error('WebSocket message error:', e)
      }
    })

    ws.on('close', () => {
      console.log('Client disconnected')
    })
  })

  console.log(`WebSocket server running on port ${port}`)
  return wss
}

export function broadcastMessage(message) {
  if (!wss) return
  
  wss.clients.forEach((client) => {
    if (client.readyState === 1) {
      client.send(JSON.stringify(message))
    }
  })
}
