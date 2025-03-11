using DAMBackend.Data;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Add CORS policy
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp", policy =>
    {
        policy.WithOrigins("http://localhost:3000") // Allow only your frontend
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

// Add DB context
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("AzureSQL")));

var app = builder.Build();


// Enable CORS middleware before Authorization
app.UseCors("AllowReactApp");


using (var scope = app.Services.CreateScope())
{
    var dbContext = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    try
    {
        if (dbContext.Database.CanConnect())
        {
            Console.WriteLine("Successfully connected to Azure SQL Database!");
        }
        else
        {
            Console.WriteLine("Connection to Azure SQL Database failed.");
        }
    }
    catch (Exception ex)
    {
        Console.WriteLine($"Failed to connect to Azure SQL Database: {ex.Message}");
    }
}





// Configure the HTTP request pipeline.
//if (app.Environment.IsDevelopment())
//{
//    app.UseSwagger();
//    app.UseSwaggerUI();
//}
app.UseSwagger();
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "DAM Backend API V1");
    c.RoutePrefix = string.Empty; // Makes Swagger the default page
});

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
