## Note
this is a demo for nestjs microservice

### admin
this service use MySQL to store products, when user create,update,delete product, these actions will send message to `main` service by RabbitMQ
### main

consume messages from `admin`, store data in MongoDB