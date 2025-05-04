import { User } from '../entities/user';
import { CreateUserDTO } from '../use-cases/create-user/create-user-dto';
import { UpdateUserDTO } from '../use-cases/update-user/update-user-dto';

export interface UserRepository {
	create(user: CreateUserDTO): Promise<void>;
	findByEmail(email: string): Promise<User | null>;
	read(): Promise<User[]>;
	update(user: UpdateUserDTO): Promise<User>;
	delete(id: number): Promise<void>;
	findById(id: number): Promise<User | null>;
	findByEmailAndPassword(email: string, secret: string): Promise<User | null>;
}
