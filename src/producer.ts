import { kafka } from './client'
import readline from 'node:readline'

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

async function producer() {
  const producer = kafka.producer()

  console.log('Producer connecting...')
  await producer.connect()
  console.log('Producer connected')

  rl.setPrompt('> ')
  rl.prompt()

  rl.on('line', async (line) => {
    const [riderName, location] = line.split(' ')

    console.log('Sending message...')
    await producer.send({
      topic: 'raider-updates',
      messages: [
        {
          key: 'location-update',
          partition: location.toLowerCase() === 'north' ? 0 : 1,
          value: JSON.stringify({
            name: riderName,
            location,
          }),
        },
      ],
    })
    console.log('Message sent')
  }).on('close', async () => {
    console.log('Disconnecting producer...')
    await producer.disconnect()
    console.log('Producer disconnected')
  })
}

producer().catch((err) => console.error(err))
