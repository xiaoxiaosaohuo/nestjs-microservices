import { Controller, Get, Post,Body, Param, Put, Delete,Inject } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './product.entity';
import { ClientProxy } from '@nestjs/microservices';


@Controller('products')
export class ProductController {
    constructor(
        private productService: ProductService,
        @Inject('PRODUCT_SERVICE') private readonly client:ClientProxy,
        ){
    }
    @Get()
    all(): Promise<Product[]> {
        this.client.emit('hello','Hello from RabbitMQ')
        return  this.productService.all();
    }
    @Post()
    async create(
        @Body() data,
        ): Promise<Product> {
        const product = await this.productService.create(data);
        this.client.emit('product_created',product)
        return product;
    }

    @Get(':id')
    async get(@Param('id') id: number) {
        console.log('Param',id)
        return this.productService.get(id);
    }

    @Put(':id')
    async update(
        @Param('id') id: number,
        @Body() data,
    ){
        await this.productService.update(id,data);
        const product = await this.productService.get(id);
        this.client.emit('product_updated',product);
        return product
    }

    @Delete(':id')
    async delete(@Param('id') id: number){
        
        await this.productService.delete(id)
        this.client.emit('product_deleted',id);
        
    }
}
