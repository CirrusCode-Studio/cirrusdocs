import { Module } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { AdminUsersController } from "./admin-users.controller";
import { UsersService } from "./users.service";
import { PrismaService } from "src/prisma/prisma.service";

@Module({
    controllers: [UsersController, AdminUsersController],
    providers: [UsersService, PrismaService],
})
export class UsersModule {}