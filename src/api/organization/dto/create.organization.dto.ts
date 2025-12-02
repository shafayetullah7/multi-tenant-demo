import { createZodDto } from 'nestjs-zod';
import z from 'zod';

const createOrganizationSchema = z.object({
  name: z.string().nonempty().max(255).trim(),
});

export class CreateOrganizationDto extends createZodDto(
  createOrganizationSchema,
) {}
