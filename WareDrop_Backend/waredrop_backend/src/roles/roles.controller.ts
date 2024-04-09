import {Body, Controller, Delete, Get, Param, Patch, Post, UseGuards} from '@nestjs/common';
import {AddRoleInput, Role, RoleDto, RolesService} from "./roles.service";
import {JwtAuthGuard} from "../auth/guards/jwt.guard";
import {PermissionGuard} from "../auth/guards/permission.guard";
import {RequiredPermission} from "../auth/guards/permission.decorator";

@Controller('roles')
@UseGuards(JwtAuthGuard, PermissionGuard)
@RequiredPermission([{permissionName: 'All'}])
export class RolesController {
    constructor(private service: RolesService) { }

    @Post()
    createRole(@Body() newRole: Role){
        return this.service.createRole(newRole);
    }

    @Get('/:id')
    getRole(@Param('id') inputId: string){
        const id = parseInt(inputId);
        return this.service.getUserRoles({userId: id});
    }

    @Get()
    getRoles(){
        return this.service.listRoles();
    }

    @Patch()
    addRole(@Body() addRoleInput: AddRoleInput){
        return this.service.addRoleToUser(addRoleInput);
    }

    @Patch('remove')
    removeRole(@Body() removeInput: AddRoleInput){
        return this.service.removeRole(removeInput);
    }

    @Delete()
    deleteRole(@Body() deleteRole: RoleDto){
        return this.service.deleteRole(deleteRole)
    }
}
