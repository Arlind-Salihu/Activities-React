using System.Linq;
using Application.Telefonat;
using AutoMapper;
using Domain;

namespace Application.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Telefoni , Telefoni>();
            CreateMap<Telefoni, TelefoniDto>()
            .ForMember(d => d.HostUsername, o => o.MapFrom(s => s.TelefonatPrezencat
            .FirstOrDefault(x => x.isHost).AppUser.UserName));
            CreateMap<TelefonatPrezenca, Profiles.Profile>()
            .ForMember(d => d.DisplayName, o => o.MapFrom(s => s.AppUser.DisplayName))
            .ForMember(d => d.Username, o => o.MapFrom(s => s.AppUser.UserName))
            .ForMember(d => d.Bio, o => o.MapFrom(s => s.AppUser.Bio));
        }
    }
}