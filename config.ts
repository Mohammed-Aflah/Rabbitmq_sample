type config={
  rabbitMQ:{
    url:string,
    exchange:string
  }
}
export const serverConfig:config = {
  rabbitMQ: {
    url: "amqp://localhost",
    exchange: "logExchange",
  },
};

