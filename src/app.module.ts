import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { UserEntity } from './user/user.entity';
import { JwtModule } from '@nestjs/jwt';

const entities = [UserEntity];

@Global()
@Module({
  imports: [
    UserModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.postgres_host,
      port: parseInt(<string>process.env.postgres_port),
      username: process.env.postgres_user,
      password: process.env.postgres_password,
      database: process.env.postgres_database,
      synchronize: true,
      autoLoadEntities: true,
      entities: entities,
    }),
    JwtModule.register({
      secret: 'UserApiSecretKey',
    }),
  ],
  exports: [JwtModule],
})
export class AppModule {}
