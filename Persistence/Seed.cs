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
                    Kategoria = "Telefon",
                    Brendi= "Apple",
                    Data = DateTime.Now.AddMonths(-2),
                    Pershkrimi = "iPhone 13 Pro Max 512Gb, ngjyra: E zeze",
                    Cmimi = 580.00m,
                },
                new Produkti
                {
                    Emri = "iPhone 12 Pro Max",
                    Kategoria = "Patika",
                    Brendi= "Apple",
                    Data = DateTime.Now.AddMonths(-2),
                    Pershkrimi = "iPhone 12 Pro Max 256Gb, ngjyra: E bardhe",
                    Cmimi = 865.00m,
                },
                new Produkti
                {
                    Emri = "Apple Watch Series 7",
                    Kategoria = "Ora",
                    Brendi= "Apple",
                    Data = DateTime.Now.AddMonths(-2),
                    Pershkrimi = "Ore Smart Apple Watch Series 7, ngjyra: E hirit",
                    Cmimi = 150.00m,
                },
                new Produkti
                {
                    Emri = "Samsung Galaxy S21 Ultra",
                    Kategoria = "Telefon",
                    Brendi= "Samsung",
                    Data = DateTime.Now.AddMonths(-2),
                    Pershkrimi = "Samsung Galaxy S21 Plus 256Gb, ngjyra: E zeze",
                    Cmimi = 970.00m,
                },
                new Produkti
                {
                    Emri = "Samsung Galaxy Note 10",
                    Kategoria = "Telefon",
                    Brendi= "Samsung",
                    Data = DateTime.Now.AddMonths(-2),
                    Pershkrimi = "Samsung Galaxy Note 10 256Gb, ngjyra: E bardhe",
                    Cmimi = 1000.00m,
                }
               
            };

            await context.Produktet.AddRangeAsync(activities);
            await context.SaveChangesAsync();
        }
    }
}