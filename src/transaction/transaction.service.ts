import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateContactDto } from './dto/create-contract.dto';
import { ProductService } from 'src/product/product.service';
import { Contract } from './entities/contract.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ContractDetail } from './entities/contract-detail.entity';
import { Payment } from './entities/payment.entity';

@Injectable()
export class TransactionService {

    constructor(
        @InjectRepository(Contract)
        private readonly contractRepo: Repository<Contract>,
        @InjectRepository(Payment)
        private readonly paymentRepo: Repository<Payment>,
        private readonly productService: ProductService
    ) { }

    async createContract(contractDto: CreateContactDto) {
        const contract = new Contract();
        contract.orderId = contractDto.orderId;
        contract.contractDetails = [];

        for (const item of contractDto.detail) {
            const product = await this.productService.findOne(item.productId);
            const contractDetail = new ContractDetail();
            contractDetail.product = product;
            contractDetail.amount = 12500;

            contract.contractDetails.push(contractDetail);
        }

        return this.contractRepo.save(contract);
    }

    async findContractById(contractId: number) {
        const row = await this.contractRepo.findOneBy({ id: contractId });
        if (!row) {
            throw new BadRequestException("Contract not found");
        }

        return row;
    }

    async createPayment(contractId: number) {
        const contract = await this.findContractById(contractId);
        const payment = new Payment();
        payment.amount = 12500;
        payment.contract = contract;
        payment.paymentMethod = "CASH";

        return this.paymentRepo.save(payment);
    }
}
