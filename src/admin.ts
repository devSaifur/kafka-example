import { kafka } from './client'

async function main() {
  const admin = kafka.admin()

  console.log('Admin connecting...')
  await admin.connect()
  console.log('Admin connected')

  console.log('Creating topic...')
  await admin.createTopics({
    topics: [
      {
        topic: 'raider-updates',
        numPartitions: 2,
      },
    ],
  })
  console.log('Topic created [raider-updates]')

  console.log('Disconnecting admin...')
  await admin.disconnect()
  console.log('Admin disconnected')
}

main().catch((err) => console.error(err))
