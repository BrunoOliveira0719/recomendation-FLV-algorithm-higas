import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

@Module({ imports: [TypeOrmModule.forRootAsync({ inject: [ConfigService], useFactory: (config: ConfigService) => ({ type: 'postgres', host: config.get('POSTGRES_HOST', 'localhost'), port: Number(config.get('POSTGRES_PORT', 5432)), username: config.get('POSTGRES_USER', 'smart'), password: config.get('POSTGRES_PASSWORD', 'smart'), database: config.get('POSTGRES_DB', 'smart_hortifruti'), autoLoadEntities: true, synchronize: true }) })] })
export class DatabaseModule {}
