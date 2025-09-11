using BusinessAccessLayer.Interfaces;
using BusinessAccessLayer.Mapping;
using BusinessAccessLayer.Services;
using DataAccessLayer;
using DataAccessLayer.Interfaces;
using DataAccessLayer.Repositories;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.Identity.Client;
using Microsoft.IdentityModel.Tokens;
using Serilog;
using System;
using System.Text;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();


Serilog.Log.Logger = new LoggerConfiguration()
    .WriteTo.Console().
    WriteTo.MSSqlServer(
       connectionString: builder.Configuration.GetConnectionString("DefaultConnection"),
        tableName: "Logs",
        autoCreateSqlTable: true
    )
    .CreateLogger();



// Configure Entity Framework
builder.Services.AddDbContext<ShipingContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddIdentity<applicationUser, IdentityRole>().AddEntityFrameworkStores<ShipingContext>();



builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,  // check who created the token
        ValidateAudience = true, // check who can use the token
        ValidateLifetime = true, // check expiration
        ValidateIssuerSigningKey = true, // check signature
        ValidIssuer = builder.Configuration["JwtSettings:Issuer"],   // from appsettings.json
        ValidAudience = builder.Configuration["JwtSettings:Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(
            Encoding.UTF8.GetBytes(builder.Configuration["JwtSettings:SecretKey"]!)) // from appsettings.json
    };
});

builder.Services.AddAuthorization();



// Add Scoped service for TbCountry with GenericRepository
builder.Services.AddScoped(typeof(IGenericRepository<>), typeof(GenericRepository<>));
// Add Scoped service for Generic Service
builder.Services.AddScoped(typeof(IGenericService<,>), typeof(GenericService<,>));
//builder.Services.AddAutoMapper(typeof(MappingProfile).Assembly);
builder.Services.AddAutoMapper(cfg => { }, typeof(MappingProfile).Assembly);
//
builder.Services.AddScoped<TokenService>();
builder.Services.AddScoped<IUserService,UserService>();
builder.Services.AddScoped<IRefreshTokenService,RefreshTokenService>();

// Learn more about configuring Swagger/OpenAPI 
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    var userManager = services.GetRequiredService<UserManager<applicationUser>>();
    var signInManager = services.GetRequiredService<SignInManager<applicationUser>>();
    var roleManager = services.GetRequiredService<RoleManager<IdentityRole>>();
    var dbContext = services.GetRequiredService<ShipingContext>();

    // Apply migrations
    await dbContext.Database.MigrateAsync();

    // Seed data
    await ContextConfig.SeedDataAsync(dbContext, userManager, roleManager);
}

app.UseAuthentication(); // must be before UseAuthorization
app.UseAuthorization();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
