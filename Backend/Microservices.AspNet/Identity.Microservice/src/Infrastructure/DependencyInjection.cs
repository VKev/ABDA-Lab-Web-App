using System;
using Infrastructure.Utils;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Infrastructure.Repositories;
using SharedLibrary.Abstractions.UnitOfWork;
using SharedLibrary.Abstractions.Repositories;
using Infrastructure.Common;
using MassTransit;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Infrastructure.Context;
using Application.Sagas;
using Domain.Entities;
using Application.Configs;

namespace Infrastructure
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddInfrastructure(this IServiceCollection services)
        {
            string solutionDirectory = Directory.GetParent(Directory.GetCurrentDirectory())?.FullName ?? "";
            if (solutionDirectory != null) DotNetEnv.Env.Load(Path.Combine(solutionDirectory, ".env"));

            services.AddTransient<RoleInitializer>();
            services.AddIdentity<User, Role>()
                .AddEntityFrameworkStores<MyDbContext>()
                .AddDefaultTokenProviders();
            services.AddScoped<IUnitOfWork, UnitOfWork>();
            services.AddScoped(typeof(IRepository<>), typeof(Repository<>));

            var environment = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");
            using var serviceProvider = services.BuildServiceProvider();
            var config = serviceProvider.GetRequiredService<EnvironmentConfig>();
            services.AddMassTransit(busConfigurator =>
            {
                
                busConfigurator.SetKebabCaseEndpointNameFormatter();
                busConfigurator.AddSagaStateMachine<UserRegisterSaga, UserRegisterSagaData>()
                    .RedisRepository(r =>
                    {
                        r.DatabaseConfiguration($"{config.RedisHost}:{config.RedisPort},password={config.RedisPassword}");
                        r.KeyPrefix = "user-register-saga";
                        r.Expiry = TimeSpan.FromMinutes(10);
                    });
                busConfigurator.AddSagaStateMachine<RoleInitializeSaga, RoleInitializeSagaData>()
                    .RedisRepository(r =>
                    {
                        r.DatabaseConfiguration($"{config.RedisHost}:{config.RedisPort},password={config.RedisPassword}");
                        r.KeyPrefix = "role-initialize-saga";
                        r.Expiry = TimeSpan.FromMinutes(10);
                    });
                busConfigurator.UsingRabbitMq((context, configurator) =>
                {
                    configurator.Host(new Uri($"rabbitmq://{config.RabbitMqHost}:{config.RabbitMqPort}/"), h =>
                    {
                        h.Username(config.RabbitMqUser);
                        h.Password(config.RabbitMqPassword);
                    });
                    configurator.ConfigureEndpoints(context);
                });

            });
            return services;
        }
    }
}