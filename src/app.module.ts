import {Module} from '@nestjs/common';
import {EtherscanModule} from './etherscan/etherscanModule';
import {ConfigModule, ConfigService} from '@nestjs/config';
import {ScheduleModule} from "@nestjs/schedule";

@Module({
    imports: [
        ConfigModule.forRoot(),
        ScheduleModule.forRoot(),
        EtherscanModule,
    ],
})

export class AppModule {
}
