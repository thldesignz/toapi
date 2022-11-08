import { Module } from '@nestjs/common';
import { TodosService } from './todos.service';
import { TodosController } from './todos.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TodoSchema } from './schemas/todo.schema';
import { PassportModule } from '@nestjs/passport';

@Module({
  controllers: [TodosController],
  imports: [
    MongooseModule.forFeature([{ name: 'Todo', schema: TodoSchema}]),
    PassportModule.register({ defaultStrategy: 'jwt', session: false }),
  ],
  providers: [TodosService]
})
export class TodosModule {}
