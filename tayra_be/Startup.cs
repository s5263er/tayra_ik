using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Options;
using Tayra_IK.Models;
using Tayra_IK.Data;
using Microsoft.OpenApi.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using System.Text;
using Microsoft.EntityFrameworkCore;
using Pomelo.EntityFrameworkCore.MySql.Infrastructure;

namespace Tayra_IK
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            var allowedOrigins = Configuration.GetSection("CorsOrigins:AllowedOrigins").Get<string[]>();
            Console.WriteLine("Configure method is called.");


            services.AddDbContext<AppDbContext>(options =>
            {
                options.UseMySql(
                    Configuration.GetConnectionString("DefaultConnection"),
                    new MySqlServerVersion(new Version("10.4.28"))); // Use MySqlServerVersion instead of MariaDbServerVersion
            });


            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(options =>
            {
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    ValidIssuer = Configuration["JwtConfig:Issuer"],
                    ValidAudience = Configuration["JwtConfig:Audience"],
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["JwtConfig:SecretKey"]))
                };
            });

            services.AddControllers();

            services.AddCors(options =>
            {
                options.AddDefaultPolicy(builder =>
                {
                    builder
                        .WithOrigins(allowedOrigins)
                        .AllowAnyHeader()
                        .AllowAnyMethod();
                });
            });

            services.AddCors(options =>
            {
                options.AddPolicy("ReactAppPolicy", builder =>
                {
                    builder.WithOrigins(allowedOrigins)
                        .AllowAnyHeader()
                        .AllowAnyMethod();
                });
            });

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "register", Version = "v1" });
            });
        }

// ...


        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
                Console.WriteLine("Configure method is called. - Configure public void");

            if (env.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI(c =>
                {
                    c.SwaggerEndpoint("/swagger/v1/swagger.json", "register");
                });
            }
            app.UseCors("ReactAppPolicy");

            app.UseHttpsRedirection();
            app.UseRouting();
            app.UseCors();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}