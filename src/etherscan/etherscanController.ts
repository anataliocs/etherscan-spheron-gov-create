import { Controller, Get, Param } from '@nestjs/common';
import { EtherscanService } from './etherscan.service';
import {UploadRes} from "./dto/UploadRes";

@Controller('uploadToken')
export class EtherscanController {
  constructor(private readonly service: EtherscanService) {}

  @Get('/:bucketName')
  async getNft(@Param('bucketName') bucketName: string): Promise<UploadRes> {
    return null;
  }
}
