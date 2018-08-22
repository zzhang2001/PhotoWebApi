using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using PhotoWebApi.Models;

namespace PhotoWebApi
{
    public class Program
    {
        public static void Main(string[] args)
        {
            IWebHost host = BuildWebHost(args);

            // Before run the DB initializer, add initial database migration.
            // In Package Manager Console, type the following commands.
            // Add-Migration Initial -Context ApplicationDbContext
            // Update-Database -Context ApplicationDbContext
            // Add-Migration InitialPhotoDb -Context PhotoDbContext
            // Update-Database -Context PhotoDbContext
            // Seed Photo database.
            using (IServiceScope scope = host.Services.CreateScope())
            {
                PhotoDbContext dbContext = scope.ServiceProvider.GetRequiredService<PhotoDbContext>();
                string strWebRootPath = scope.ServiceProvider.GetRequiredService<IHostingEnvironment>().WebRootPath;
                PhotoDbInitializer.Initialize(dbContext, strWebRootPath);
            }

            host.Run();
        }

        public static IWebHost BuildWebHost(string[] args) =>
            WebHost.CreateDefaultBuilder(args)
                .UseStartup<Startup>()
                .Build();
    }
}
