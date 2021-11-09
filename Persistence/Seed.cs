using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context)
        {
            if (context.Produktet.Any()) return;
            
            var activities = new List<Produkti>
            {
                new Produkti
                {
                    Emri = "Nike Pullover",
                    Kategoria = "Duksa",
                    Data = DateTime.Now.AddMonths(-2),
                    Pershkrimi = "Duks per meshkuj",
                    Cmimi = 20.00m,
                },
                new Produkti
                {
                    Emri = "Patika Nike",
                    Kategoria = "Patika",
                    Data = DateTime.Now.AddMonths(-2),
                    Pershkrimi = "Patika Nike per meshkuj",
                    Cmimi = 45.00m,
                },
                new Produkti
                {
                    Emri = "Syze RayBan",
                    Kategoria = "Syze",
                    Data = DateTime.Now.AddMonths(-2),
                    Pershkrimi = "Syze dielli RayBan per meshkuj",
                    Cmimi = 70.00m,
                },
                new Produkti
                {
                    Emri = "Kemishe Lacoste",
                    Kategoria = "Kemisha",
                    Data = DateTime.Now.AddMonths(-2),
                    Pershkrimi = "Kemishe Lacoste per Meshkuj",
                    Cmimi = 17.50m,
                },
                new Produkti
                {
                    Emri = "Maice Adidas",
                    Kategoria = "Maice",
                    Data = DateTime.Now.AddMonths(-2),
                    Pershkrimi = "Maice Adidas per femije",
                    Cmimi = 10.00m,
                }
               
            };

            await context.Produktet.AddRangeAsync(activities);
            await context.SaveChangesAsync();
        }
    }
}