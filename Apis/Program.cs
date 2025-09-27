using BusinessAccessLayer.Interfaces;
using BusinessAccessLayer.Mapping;
using BusinessAccessLayer.Services;
using DataAccessLayer;
using DataAccessLayer.Interfaces;
using DataAccessLayer.Repositories;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Client;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Serilog;
using System;
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



// Configure Entity Framework
builder.Services.AddDbContext<ShipingContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddIdentity<applicationUser, IdentityRole>().AddEntityFrameworkStores<ShipingContext>();



builder.Services.AddAuthentication(options =>
{
    //options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    //options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
   // options.DefaultChallengeScheme = CookieAuthenticationDefaults.AuthenticationScheme;
   // options.DefaultAuthenticateScheme = CookieAuthenticationDefaults.AuthenticationScheme;
  //  options.DefaultSignInScheme = CookieAuthenticationDefaults.AuthenticationScheme;

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
}).AddCookie(options =>
{
    options.Cookie.Name = "RefreshToken";
    options.Cookie.HttpOnly = true;
    options.Cookie.SecurePolicy = CookieSecurePolicy.Always; // Use Always in production
}); ;

builder.Services.AddAuthorization();


builder.Services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
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
builder.Services.AddScoped<IGenericUnitOfWork,GenericUnitOfWork>();
builder.Services.AddScoped<IShippingService,ShippingService>();
builder.Services.AddScoped<IShippingTypeService,ShippingTypeService>();
builder.Services.AddScoped<IRecieverService,ReceiverService>();
builder.Services.AddScoped<ISenderService,SenderService>();

builder.Services.AddScoped<ISubscriptionPackageService,SubscriptionPackageService>();
builder.Services.AddScoped<IPaymentMethodService,PaymentPackageService>();

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



// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger(c=> c.OpenApiVersion = Microsoft.OpenApi.OpenApiSpecVersion.OpenApi2_0);
   
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthentication(); // must be before UseAuthorization
app.UseAuthorization();

app.MapControllers();

app.Run();
