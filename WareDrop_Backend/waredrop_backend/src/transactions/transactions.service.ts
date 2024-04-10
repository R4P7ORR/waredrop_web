import {Injectable} from '@nestjs/common';
import {PrismaService} from "../database/prisma.service";
import {UserDto} from "../users/users.service";
import {IsNotEmpty, IsNumber, IsOptional, IsString} from "class-validator";

export class Transaction {
    @IsNumber()
    @IsOptional()
    transId?: number

    @IsString()
    @IsOptional()
    transArrivedDate?: string

    @IsNumber()
    @IsNotEmpty()
    transOriginId: number

    @IsNumber()
    @IsNotEmpty()
    transTargetId: number

    @IsNumber()
    @IsNotEmpty()
    itemId: number

    @IsString()
    @IsOptional()
    workerEmail?: string
}

export class WorkerUpdateInput {
    @IsNumber()
    @IsNotEmpty()
    transId: number
}

@Injectable()
export class TransactionsService {
    constructor(private readonly db: PrismaService) { }

    async createTrans(newTrans: Transaction){
        return this.db.transactions.create({
            data: {
                trans_post_date: new Date(Date.now()),
                trans_origin_id: newTrans.transOriginId,
                trans_target_id: newTrans.transTargetId,
                item_item_id: newTrans.itemId
            }
        })
    }

    async getAllTransByWorker(user: UserDto){
        return this.db.transactions.findMany({
            where: {
                worker_email: user.userEmail,
                trans_arrived_date: null
            },
            include: {
                items: {
                    select: {item_name: true, item_quantity: true}
                }
            }
        });
    }

    async getAllTrans(){
        return this.db.transactions.findMany({
            include: {
            items: {
                select: {item_name: true, item_quantity: true}
            }
        }
        });
    }

    async getAvailableTrans(){
        return this.db.transactions.findMany({
            where: {
                worker_email: null
            },
            include: {
                items: {
                    select: {item_name: true, item_quantity: true}
                }
            },
        })
    }

    async getTransDone(input: UserDto){
        return this.db.transactions.findMany({
            where: {
                worker_email: input.userEmail,
            }
        })
    }

    async addWorkerToTrans(addInput: WorkerUpdateInput, workerEmail: string ){
        return this.db.transactions.update({
            where: {
                trans_id: addInput.transId
            },
            data: {
                worker_email: workerEmail,
            }
        })
    }

    async updateTrans(updateInput: WorkerUpdateInput){
        const result = await this.db.transactions.update({
            data: {
                trans_arrived_date: new Date(Date.now()),
            },
            where: {
                trans_id: updateInput.transId,
            }
        })
        await this.db.items.update({
            where: {
                item_id: result.item_item_id
            },
            data: {
                warehouse_id: result.trans_target_id
            }
        })
        return result;
    }
}
