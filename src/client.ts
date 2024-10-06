import { Kafka } from 'kafkajs'

export const kafka = new Kafka({
  clientId: 'test',
  brokers: ['localhost:9092'],
})
