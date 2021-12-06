using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Identity;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context, UserManager<AppUser> userManager)
        {
            if(!userManager.Users.Any()){
                var users = new List<AppUser>{
                    new AppUser{DisplayName = "Lindi", UserName="lindi", Email="lindi@test.com"},
                    new AppUser{DisplayName = "Blini", UserName="blini", Email="blini@test.com"},
                    new AppUser{DisplayName = "Lumi", UserName="lumi", Email="lumi@test.com"}
                };

                foreach (var user in users)
                {
                    await userManager.CreateAsync(user, "Lindii7@");
                }
            }

            if (context.Telefonat.Any()) return;


            var telefonat = new List<Telefoni>
            {
                new Telefoni
                {
                    Emri = "iPhone 13 Pro Max",
                    Kategoria = "iPhone 13 Pro Max Sierra Blue",
                    Brendi= "Apple",
                    Data = DateTime.Now.AddMonths(-2),
                    Pershkrimi = "iPhone 13 Pro Max 512GB, ngjyra: Sierra Blue",
                    Cmimi = 580.00m,
                },
                new Telefoni
                {
                    Emri = "iPhone X",
                    Kategoria = "iPhone X White",
                    Brendi= "Apple",
                    Data = DateTime.Now.AddMonths(-2),
                    Pershkrimi = "iPhone X 64GB, ngjyra: E bardhe",
                    Cmimi = 865.00m,
                },
                new Telefoni
                {
                    Emri = "Apple Watch Series 7",
                    Kategoria = "Apple Watch Series 7",
                    Brendi= "Apple",
                    Data = DateTime.Now.AddMonths(-2),
                    Pershkrimi = "Ore Smart Apple Watch Series 7, ngjyra: E hirit",
                    Cmimi = 150.00m,
                },
                new Telefoni
                {
                    Emri = "Samsung Galaxy S21 Ultra",
                    Kategoria = "Samsung Galaxy S21 Ultra Black",
                    Brendi= "Samsung",
                    Data = DateTime.Now.AddMonths(-2),
                    Pershkrimi = "Samsung Galaxy S21 Plus 256GB, ngjyra: E zeze",
                    Cmimi = 970.00m,
                },
                new Telefoni
                {
                    Emri = "iPhone 11",
                    Kategoria = "iPhone 11 Red",
                    Brendi= "Apple",
                    Data = DateTime.Now.AddMonths(-2),
                    Pershkrimi = "iPhone 11 128GB, ngjyra: E kuqe",
                    Cmimi = 580.00m,
                }

            };

            await context.Telefonat.AddRangeAsync(telefonat);
            await context.SaveChangesAsync();

            if (context.Laptopat.Any()) return;
            var laptopat = new List<Laptopi>
            {
                new Laptopi
                {
                    Emri = "MacBook",
                    Kategoria = "MacBook Air (M1, 2020), Gold",
                    Brendi= "Apple",
                    Data = DateTime.Now.AddMonths(-2),
                    Pershkrimi = "MacBook Air (M1, 2020), ngjyra: Gold, Sistemi Operativ: macOS, Chip: Apple M1 chip, Memoria: 8GB unified memory, Storage: 256GB SSD (Configurable to 512GB SSD, 1TB, or 2TB), Processor: 1.1GHz dual-core Intel Core i3, Turbo Boost up to 3.2GHz, with 4MB L3 cache, Touch: Touch ID sensor, Kamera: 720p FaceTime HD camera",
                    Cmimi = 999.00m
                },
                new Laptopi
                {
                    Emri = "MacBook Air (Retina, 13-inch, 2019)",
                    Kategoria = "MacBook Air (Retina, 13-inch, 2019), Space Gray",
                    Brendi= "Apple",
                    Data = DateTime.Now.AddMonths(-2),
                    Pershkrimi = "MacBook Air (Retina, 13-inch, 2019), ngjyra: Space Gray, Sistemi Operativ: macOS, Memoria: 8GB of 2133MHz LPDDR3 onboard memory (Configurable to 16GB of memory), Storage: 128GB PCIe-based SSD (Configurable to 256GB, 512GB, or 1TB SSD), Processor: 1.6GHz dual-core Intel Core i5, Turbo Boost up to 3.6GHz, with 4MB L3 cache, Touch: Integrated Touch ID sensor, Kamera: 720p FaceTime HD camera",
                    Cmimi = 865.00m,
                },
                new Laptopi
                {
                    Emri = "HP Pavilion Laptop",
                    Kategoria = "HP Pavilion Laptop - 15z-eh100, Silver",
                    Brendi= "HP",
                    Data = DateTime.Now.AddMonths(-2),
                    Pershkrimi = "HP Pavilion Laptop, ngjyra: Silver, Sistemi Operativ: Windows 11 Home, Memoria: 16 GB DDR4-3200 SDRAM (2 x 8 GB), Storage: 512 GB PCIe® NVMe™ M.2 SSD, Processor: AMD Ryzen™ 7 5700U (up to 4.3 GHz, 8 MB L3 cache, 8 cores, 16 thread) + AMD Radeon™ Graphics, Touch: Fingerprint reader not available, Kamera: HP Wide Vision 720p HD camera with integrated dual array digital microphones",
                    Cmimi = 430.00m,
                }

            };
            await context.Laptopat.AddRangeAsync(laptopat);
            await context.SaveChangesAsync();

            if (context.Orat.Any()) return;
            var orat = new List<Ora>
            {
                new Ora
                {
                    Emri = "Apple Watch",
                    Kategoria = "Apple Watch Series 5",
                    Brendi= "Apple",
                    Data = DateTime.Now.AddMonths(-2),
                    Pershkrimi = "Ore Smart Apple Watch Series 5, ngjyra: Pink",
                    Cmimi = 999.00m
                },
                new Ora
                {
                    Emri = "Apple Watch",
                    Kategoria = "Apple Watch Series 6",
                    Brendi= "Apple",
                    Data = DateTime.Now.AddMonths(-2),
                    Pershkrimi = "Ore Smart Apple Watch Series 5, ngjyra: E kalter",
                    Cmimi = 865.00m,
                },
                new Ora
                {
                    Emri = "Apple Watch",
                    Kategoria = "Apple Watch Series 7",
                    Brendi= "Apple",
                    Data = DateTime.Now.AddMonths(-2),
                    Pershkrimi = "Ore Smart Apple Watch Series 7, ngjyra: E hirit",
                    Cmimi = 430.00m,
                }

            };

            await context.Orat.AddRangeAsync(orat);
            await context.SaveChangesAsync();
        }
    }
}