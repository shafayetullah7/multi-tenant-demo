import { ConflictException, Injectable } from '@nestjs/common';
import { DrizzleService } from 'src/_db/drizzle/drizzle.service';
import { TNewOrganization, TOrganization } from 'src/_db/drizzle/tables';
import { OrganizationRepositoryService } from 'src/repositories/organization-repository/organization-repository.service';

@Injectable()
export class OrganizationService {
  constructor(
    private readonly organizationRepo: OrganizationRepositoryService,
    private readonly db: DrizzleService,
  ) {}

  async createOrganization(payload: TNewOrganization): Promise<TOrganization> {
    const { name } = payload;

    const result = await this.db.transaction(async (tx) => {
      const existingOrganization =
        await this.organizationRepo.getOrganizationByName(name, {
          tx,
          lock: false,
        });
        
      if (existingOrganization) {
        throw new ConflictException(
          'Organization with this name already exists',
        );
      }

      const newOrganization = await this.organizationRepo.createOrganization(
        payload,
        tx,
      );

      return newOrganization;
    });

    return result;
  }
}
