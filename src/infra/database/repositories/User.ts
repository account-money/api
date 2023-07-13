import { CreateUser, UpdateUser, User } from "@/domain/models/User";
import { User as UserEntity } from "@/infra/database/entities/User";
import { DataSource, Repository } from "typeorm";



export class UserRepository {
    private repo: Repository<UserEntity>
    public constructor(appDataSource: DataSource){
        this.repo = appDataSource.getRepository(UserEntity)
    }
    public async get(){
        const users = await this.repo.find({select: ['id', 'name', 'email', 'isVerified', 'createdAt', 'updatedAt']});
        return users
    }

    public async getById(id:string): Promise<User | null>{
        const user = await this.repo.findOne({select: ['id', 'name', 'email', 'isVerified', 'createdAt', 'updatedAt'], where: {id}, relations: ['cards', 'cards.type', 'revenues', 'expenses', 'categories'] });
        return user
    }

    public async getByToken(token:string): Promise<User | null>{
        const user = await this.repo.findOne({select: ['id', 'name', 'email', 'token', 'createdAt', 'updatedAt'], where: {token} });
        return user
    }

    public async getByEmail(email: string): Promise<User | null>{
        const user = await this.repo.findOne({select: ['id', 'name', 'email', 'createdAt', 'isVerified', 'updatedAt', 'password'], where: {email}, relations: ['cards', 'revenues', 'expenses', 'categories'] });
        return user
    }

    public async insert(data: CreateUser): Promise<User | null>{
        const {id} = await this.repo.save(data);
        return this.repo.findOne({select: ['id', 'name', 'email', 'createdAt', 'updatedAt'], where: {id} })
    }

    public async update(data: UpdateUser): Promise<User | null>{
        const {id} = await this.repo.save(data);
        return this.repo.findOne({select: ['id', 'name', 'email', 'isVerified', 'createdAt', 'updatedAt'], where: {id} })
    }

    public async delete(id: string): Promise<User | any>{
        return this.repo.delete({id} )
    }
}