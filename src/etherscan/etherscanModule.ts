import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { EtherscanController } from './etherscanController';
import { EtherscanService } from './etherscan.service';
import {ConfigModule} from "@nestjs/config";

@Module({
  imports: [HttpModule],
  controllers: [EtherscanController],
  providers: [EtherscanService],
})
export class EtherscanModule {}
