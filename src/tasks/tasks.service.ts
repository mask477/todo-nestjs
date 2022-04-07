import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}

  async findAll(): Promise<Task[]> {
    return await this.tasksRepository.find();
  }

  async findOne(id: number): Promise<Task> {
    return await this.tasksRepository.findOne(id);
  }

  async create(task: Task): Promise<Task> {
    const newTask = this.tasksRepository.create(task);
    await this.tasksRepository.save(newTask);

    return newTask;
  }

  async update(id: number, updatedTask: Task): Promise<Task> {
    const task = await this.tasksRepository.findOne(id);
    task.title = updatedTask.title ? updatedTask.title : task.title;
    task.description = updatedTask.description
      ? updatedTask.description
      : task.description;
    task.status = updatedTask.status ? updatedTask.status : task.status;

    await this.tasksRepository.save(task);

    return task;
  }

  async delete(id: number): Promise<void> {
    await this.tasksRepository.delete(id);
  }
}
