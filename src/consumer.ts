import { kafka } from './client'
const group = process.argv[2]

async function consumer() {
  const consumer = kafka.consumer({ groupId: group })

  console.log('Consumer connecting...')
  await consumer.connect()
  console.log('Consumer connected')

  console.log('Subscribing to topic...')
  await consumer.subscribe({ topic: 'raider-updates', fromBeginning: true })
  console.log('Subscribed to topic')

  console.log('Consuming messages...')
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log(
        `Group: ${group}, Message on ${topic} partition ${partition}:`,
        message.value?.toString()
      )
    },
  })
}

consumer().catch((err) => console.error(err))
