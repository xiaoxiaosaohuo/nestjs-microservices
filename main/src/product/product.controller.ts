import { Controller,Get, Inject } from '@nestjs/common';
import { ProductService } from './product.service';
import { EventPattern } from '@nestjs/microservices';



@Controller('products')
export class ProductController {
    constructor(
        private productService: ProductService,
       
    ){  }

    @Get()
    async all(){
        return this.productService.all();
    }

    @EventPattern('product_created')
    async productCreated(product:any){
       await this.productService.create({title:product.name,image:product.image,likes:product.likes,id:product.id});
    }

    @EventPattern('product_updated')
    async productUpdated(product:any){
       await this.productService.update(product.id,{title:product.name,image:product.image,likes:product.likes});
    }



}
