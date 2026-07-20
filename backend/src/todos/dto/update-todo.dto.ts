// Beim Update sind alle Felder optional – der Client schickt nur,
// was er ändern will (deshalb HTTP PATCH statt PUT).
import { IsBoolean, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateTodoDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  title?: string;

  @IsOptional()
  @IsBoolean()
  done?: boolean;
}
