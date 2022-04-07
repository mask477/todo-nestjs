import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { TasksService } from './tasks.service';
import { Task } from './task.entity';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  async findAll(): Promise<Task[]> {
    return this.tasksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id): Promise<Task> {
    return this.tasksService.findOne(id);
  }

  @Post()
  create(@Body() createTaskDto: Task): Promise<Task> {
    return this.tasksService.create(createTaskDto);
  }

  @Put(':id')
  update(@Body() updateTaskDto: Task, @Param('id') id): Promise<Task> {
    return this.tasksService.update(id, updateTaskDto);
  }

  @Delete(':id')
  delete(@Param('id') id: number): Promise<void> {
    return this.tasksService.delete(id);
  }
}
