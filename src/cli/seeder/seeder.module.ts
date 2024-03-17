import { Module } from '@nestjs/common';
import { SeederCommand } from './seeder.command';

@Module({
    providers: [SeederCommand]
})
export class SeederModule { }
