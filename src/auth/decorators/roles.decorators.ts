import { SetMetadata } from "@nestjs/common"
import { UserRole } from "../entities/user.entity"

//  -> unique for storing and retriving role requirement as metadata on routes handler 





export const ROLES_KEY = 'roles';

// -> roles decorator markes the routes with the roles that are allowed to access them

// -> roles guard will later reads this metadata to check if the user has permission

export const Roles = (...roles : UserRole[]) => SetMetadata(ROLES_KEY, roles)