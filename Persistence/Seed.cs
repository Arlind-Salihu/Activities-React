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
        public static async Task SeedData(DataContext context,
            UserManager<AppUser> userManager)
        {
            if (!userManager.Users.Any() && !context.Activities.Any())
            {
                var users = new List<AppUser>
                {
                    new AppUser
                    {
                        DisplayName = "Lindi",
                        UserName = "lindi",
                        Email = "lindi@test.com"
                    },
                    new AppUser
                    {
                        DisplayName = "Jane",
                        UserName = "jane",
                        Email = "jane@test.com"
                    },
                    new AppUser
                    {
                        DisplayName = "Tom",
                        UserName = "tom",
                        Email = "tom@test.com"
                    },
                };

                foreach (var user in users)
                {
                    await userManager.CreateAsync(user, "Lindii7@");
                }


            var activities = new List<Activity>
            {
                new Activity
                {
                    Emri = "iPhone 13 Pro Max",
                    Kategoria = "iPhone 13 Pro Max Sierra Blue",
                    Brendi= "Apple",
                    Data = DateTime.Now.AddMonths(+2),
                    Pershkrimi = "iPhone 13 Pro Max 512GB, ngjyra: Sierra Blue",
                    ActivitiesPrezencat = new List<ActivitiesPrezenca>
                        {
                            new ActivitiesPrezenca
                            {
                                AppUser = users[0],
                                isHost = true
                            }
                        }
                },
                new Activity
                {
                    Emri = "iPhone X",
                    Kategoria = "iPhone X White",
                    Brendi= "Apple",
                    Data = DateTime.Now.AddMonths(+2),
                    Pershkrimi = "iPhone X 64GB, ngjyra: E bardhe",
                    ActivitiesPrezencat = new List<ActivitiesPrezenca>
                        {
                            new ActivitiesPrezenca
                            {
                                AppUser = users[0],
                                isHost = true
                            },
                            new ActivitiesPrezenca
                            {
                                AppUser = users[1],
                                isHost = false
                            },
                        }
                },
                new Activity
                {
                    Emri = "Apple Watch Series 7",
                    Kategoria = "Apple Watch Series 7",
                    Brendi= "Apple",
                    Data = DateTime.Now.AddMonths(+2),
                    Pershkrimi = "Ore Smart Apple Watch Series 7, ngjyra: E hirit",
                    ActivitiesPrezencat = new List<ActivitiesPrezenca>
                        {
                            new ActivitiesPrezenca
                            {
                                AppUser = users[2],
                                isHost = true
                            },
                            new ActivitiesPrezenca
                            {
                                AppUser = users[1],
                                isHost = false
                            },
                        }
                },
                new Activity
                {
                    Emri = "Samsung Galaxy S21 Ultra",
                    Kategoria = "Samsung Galaxy S21 Ultra Black",
                    Brendi= "Samsung",
                    Data = DateTime.Now.AddMonths(+2),
                    Pershkrimi = "Samsung Galaxy S21 Plus 256GB, ngjyra: E zeze",
                    ActivitiesPrezencat = new List<ActivitiesPrezenca>
                        {
                            new ActivitiesPrezenca
                            {
                                AppUser = users[0],
                                isHost = true
                            },
                            new ActivitiesPrezenca
                            {
                                AppUser = users[2],
                                isHost = false
                            },
                        }
                },
                new Activity
                {
                    Emri = "iPhone 11",
                    Kategoria = "iPhone 11 Red",
                    Brendi= "Apple",
                    Data = DateTime.Now.AddMonths(+2),
                    Pershkrimi = "iPhone 11 128GB, ngjyra: E kuqe",
                    ActivitiesPrezencat = new List<ActivitiesPrezenca>
                        {
                            new ActivitiesPrezenca
                            {
                                AppUser = users[1],
                                isHost = true                            
                            },
                            new ActivitiesPrezenca
                            {
                                AppUser = users[0],
                                isHost = false                            
                            },
                        }
                }

            };

            await context.Activities.AddRangeAsync(activities);
            await context.SaveChangesAsync();            
        }
    }
}}