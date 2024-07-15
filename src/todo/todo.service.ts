import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { DatabaseService } from 'src/database/database.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class TodoService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createTodoDto: CreateTodoDto, userEmail: string): Promise<CreateTodoDto> {
    try {

      const user = await this.databaseService.user.findFirst({where: {email : userEmail}});

      if(!user){
        throw new NotFoundException("User Not Found!");
      }

      let data: Prisma.myTodoCreateInput = {
        task: createTodoDto.task,
        description: createTodoDto.description,
        status: 'ACTIVE',
        user: {
          connect : {email : user.email}
        }
      };
      return await this.databaseService.myTodo.create({ data });
    } catch (error) {
      return error;
    }
  }

  async findAll(userEmail: string) {
    return await this.databaseService.myTodo.findMany({
      where: {
        userEmail: userEmail
      }
    });
  }

  async findOne(id: number) {
    return await this.databaseService.myTodo.findFirst({
      where: {
        id: id,
      },
    });
  }

  async update(id: number, updateTodoDto: UpdateTodoDto) {
    return await this.databaseService.myTodo.update({
      where: {
        id: id,
      },
      data: updateTodoDto,
    });
  }

  async remove(id: number) {
    return await this.databaseService.myTodo.delete({
      where: {
        id: id,
      },
    });
  }
}