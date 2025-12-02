import { Body, Controller, Get, Post } from '@nestjs/common';
import { OrganizationService } from './organization.service';
import { CreateOrganizationDto } from './dto/create.organization.dto';

@Controller('organizations')
export class OrganizationController {
  constructor(private readonly organizationService: OrganizationService) {}

  @Post()
  async createOrganization(@Body() payload: CreateOrganizationDto) {
    const result = await this.organizationService.createOrganization(payload);
    return result;
  }

  @Get()
  async getOrganizations() {
    return 'organizations';
  }
}
