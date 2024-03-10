import { Body, Controller, Post } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateContactDto } from './dto/create-contract.dto';
import { Transactional } from 'typeorm-transactional';

@Controller('transaction')
export class TransactionController {

    constructor(
        private readonly transactionService: TransactionService,
    ) { }

    @Transactional()
    @Post("create-contract")
    async handleCreateContract(@Body() payload: CreateContactDto) {
        const data = await this.transactionService.createContract(payload);
        return { data }
    }
}
