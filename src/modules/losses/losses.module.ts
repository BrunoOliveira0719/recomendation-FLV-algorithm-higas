import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Loss } from './entities/loss.entity';
import { LossesController } from './losses.controller';
import { LossesService } from './losses.service';

@Module({ imports: [TypeOrmModule.forFeature([Loss])], controllers: [LossesController], providers: [LossesService], exports: [LossesService] })
export class LossesModule {}
