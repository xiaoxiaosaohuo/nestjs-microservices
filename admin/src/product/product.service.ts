import { Injectable ,} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {Product} from './product.entity';
import {Repository,FindOneOptions} from 'typeorm';


@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product)
        private readonly productRespository: Repository<Product>
    ){
       
    }

    async all ():Promise<Product[]>{
        return await this.productRespository.find();
    }

    async create(data):Promise<Product>{
        return await this.productRespository.save(data);
    }

    async get(id:number):Promise<Product>{
    
        return this.productRespository.findOne({where:{id:id}});
    }

    async update(id:number,data):Promise<any>{
        return this.productRespository.update(id,data);
    }

    async delete(id:number):Promise<any>{
        return this.productRespository.delete(id);
    }
}
