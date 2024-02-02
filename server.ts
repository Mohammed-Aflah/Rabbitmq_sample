import express from "express";
import { Request, Response, NextFunction } from "express";
const app = express();
import { Producer } from "./producer";

const producer=new Producer()
app.use(express.json());

app.post(
  "/sendLog",
  async (req: Request, res: Response) => {
    try {
        
        console.log(req.body);
        
        await producer.publishMessage(req.body.logType,req.body.message)
    
        res.send("message sended")
    } catch (error) {
        console.log(`Error ${error}`);
        
    }
  }
);

app.listen(4002,()=>{
    console.log(`Server started `);
    
})
