import { Body, Controller, Post } from '@nestjs/common';
import { ProductStockService } from './product-stock.service';
import { Transactional } from 'typeorm-transactional';

@Controller('product-stock')
export class ProductStockController {

    constructor(
        private readonly productStockService: ProductStockService,
    ) { }

    @Transactional()
    @Post('/restock')
    async handleRestock(@Body() post: { productId: number, stockQty: number }) {
        const result = await this.productStockService.restock(post.productId, post.stockQty);

        return { data: result }
    }

}
