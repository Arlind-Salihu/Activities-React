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
                    Emri = "iPhone 13 Pro Max",
                    Kategoria = "iPhone 13 Pro Max Sierra Blue",
                    Brendi= "Apple",
                    Data = DateTime.Now.AddMonths(-2),
                    Pershkrimi = "iPhone 13 Pro Max 512GB, ngjyra: Sierra Blue",
                    Cmimi = 580.00m,
                },
                new Produkti
                {
                    Emri = "iPhone X",
                    Kategoria = "iPhone X White",
                    Brendi= "Apple",
                    Data = DateTime.Now.AddMonths(-2),
                    Pershkrimi = "iPhone X 64GB, ngjyra: E bardhe",
                    Cmimi = 865.00m,
                },
                new Produkti
                {
                    Emri = "Apple Watch Series 7",
                    Kategoria = "Apple Watch Series 7",
                    Brendi= "Apple",
                    Data = DateTime.Now.AddMonths(-2),
                    Pershkrimi = "Ore Smart Apple Watch Series 7, ngjyra: E hirit",
                    Cmimi = 150.00m,
                },
                new Produkti
                {
                    Emri = "Samsung Galaxy S21 Ultra",
                    Kategoria = "Samsung Galaxy S21 Ultra Black",
                    Brendi= "Samsung",
                    Data = DateTime.Now.AddMonths(-2),
                    Pershkrimi = "Samsung Galaxy S21 Plus 256GB, ngjyra: E zeze",
                    Cmimi = 970.00m,
                },
                new Produkti
                {
                    Emri = "iPhone 11",
                    Kategoria = "iPhone 11 Red",
                    Brendi= "Apple",
                    Data = DateTime.Now.AddMonths(-2),
                    Pershkrimi = "iPhone 11 128GB, ngjyra: E kuqe",
                    Cmimi = 580.00m,
                }
               
            };

            await context.Produktet.AddRangeAsync(activities);
            await context.SaveChangesAsync();
        }
    }
}