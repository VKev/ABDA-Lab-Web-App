using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.Entities;
using Domain.Repositories;
using Infrastructure.Common;
using Infrastructure.Context;

namespace Infrastructure.Repositories
{
    public class RoleRepository :  Repository<Role>, IRoleRepository
    {
        public RoleRepository(MyDbContext context) : base(context)
        {
        }
    }
}