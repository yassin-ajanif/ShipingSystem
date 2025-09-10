using BusinessAccessLayer.Interfaces;
using BusinessAccessLayer.Mapping;
using BusinessAccessLayer.Services;
using DataAccessLayer;
using DataAccessLayer.Interfaces;
using DataAccessLayer.Repositories;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Serilog;
using System.Text;

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

// Configure Entity Framework
builder.Services.AddDbContext<ShipingContext>();
// Add Scoped service for TbCountry with GenericRepository
builder.Services.AddScoped(typeof(IGenericRepository<>), typeof(GenericRepository<>));
// Add Scoped service for Generic Service
builder.Services.AddScoped(typeof(IGenericService<,>), typeof(GenericService<,>));
//builder.Services.AddAutoMapper(typeof(MappingProfile).Assembly);
builder.Services.AddAutoMapper(cfg => { }, typeof(MappingProfile).Assembly);




//
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

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
