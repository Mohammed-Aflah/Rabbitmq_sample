// step 1 Connect to the rabbitmq server *
// step 2 Create a new on that connection
// step 3 create exchange
// step 4 publish the message to exchange with a routing key

import amqp from "amqplib";
import { serverConfig } from "./config";
export class Producer {
  channel: any;

  async createChannel() {
    const connection = await amqp.connect(serverConfig.rabbitMQ.url);
    this.channel = (await connection.createChannel())
  }

  async publishMessage(routingKey:string, message:string) {
    try {
        
        if (!this.channel) {
          await this.createChannel();
        }
    
        await this.channel.assertExchange(serverConfig.rabbitMQ.exchange, "direct");
        const bufferMessage=Buffer.from(JSON.stringify({
            logType:routingKey,
            message:message,
            dateTime:new Date()
        }))
        console.log(bufferMessage);
        
        
        await this.channel.publish(serverConfig.rabbitMQ.exchange,routingKey,bufferMessage)
    
        console.log(`Message ${message} is send to exchange ${serverConfig.rabbitMQ.exchange}`);
    } catch (error) {
        console.log(`Err in message send ${error}`);
        
    }
    
  }
}


