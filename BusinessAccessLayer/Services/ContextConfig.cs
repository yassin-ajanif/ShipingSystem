using DataAccessLayer;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessAccessLayer.Services
{
    public class ContextConfig
    {
      
            private static readonly string seedAdminEmail = "yassin.ajanif@gmail.com";
            public static async Task SeedDataAsync(ShipingContext context,
                UserManager<applicationUser> userManager,
                RoleManager<IdentityRole> roleManager)
            {
                await SeedUserAsync(userManager, roleManager);
            }

            public static async Task SeedUserAsync(UserManager<applicationUser> userManager,
                RoleManager<IdentityRole> roleManager)
            {
                // Ensure roles exist
                if (!await roleManager.RoleExistsAsync("Admin"))
                {
                    await roleManager.CreateAsync(new IdentityRole("Admin"));
                }

                if (!await roleManager.RoleExistsAsync("User"))
                {
                    await roleManager.CreateAsync(new IdentityRole("User"));
                }

                // Ensure admin user exists
                var adminEmail = seedAdminEmail;
                var adminUser = await userManager.FindByEmailAsync(adminEmail);
                if (adminUser == null)
                {
                    var id = Guid.NewGuid().ToString();
                    adminUser = new applicationUser
                    {
                        Id = id,
                        UserName = adminEmail,
                        Email = adminEmail,
                        EmailConfirmed = true,
                        FirstName = "yassin",
                        LastName = "ajanif",
                        Phone = "212611662541"
                    };
                   var adminUserPassword = "Xr!9vT$3kLp@72ZmQ#";

                    var result = await userManager.CreateAsync(adminUser, adminUserPassword);
                    await userManager.AddToRoleAsync(adminUser, "Admin");
                }
            }
        }
    }

