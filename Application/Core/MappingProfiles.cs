using System.Linq;
using Application.Laptopat;
using Application.Orat;
using Application.Telefonat;
using AutoMapper;
using Domain;

namespace Application.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            //TELEFONI
            CreateMap<Telefoni , Telefoni>();

            CreateMap<Telefoni, TelefoniDto>()
            .ForMember(d => d.HostUsername, o => o.MapFrom(s => s.TelefonatPrezencat
            .FirstOrDefault(x => x.isHost).AppUser.UserName));

            CreateMap<TelefonatPrezenca, Profiles.Profile>()
            .ForMember(d => d.DisplayName, o => o.MapFrom(s => s.AppUser.DisplayName))
            .ForMember(d => d.Usename, o => o.MapFrom(s => s.AppUser.UserName))
            .ForMember(d => d.Bio, o => o.MapFrom(s => s.AppUser.Bio));

            //LAPTOPI
            CreateMap<Laptopi, Laptopi>();

            CreateMap<Laptopi, LaptopiDto>()
            .ForMember(d => d.HostUsername, o => o.MapFrom(s => s.LaptopatPrezencat
            .FirstOrDefault(x => x.isHost).AppUser.UserName));
             CreateMap<LaptopatPrezenca, Profiles.Profile>()
            .ForMember(d => d.DisplayName, o => o.MapFrom(s => s.AppUser.DisplayName))
            .ForMember(d => d.Usename, o => o.MapFrom(s => s.AppUser.UserName))
            .ForMember(d => d.Bio, o => o.MapFrom(s => s.AppUser.Bio));


            //ORA
            CreateMap<Ora, Ora>();
            
            CreateMap<Ora, OraDto>()
            .ForMember(d => d.HostUsername, o => o.MapFrom(s => s.OratPrezencat
            .FirstOrDefault(x => x.isHost).AppUser.UserName));

            CreateMap<OratPrezenca, Profiles.Profile>()
            .ForMember(d => d.DisplayName, o => o.MapFrom(s => s.AppUser.DisplayName))
            .ForMember(d => d.Usename, o => o.MapFrom(s => s.AppUser.UserName))
            .ForMember(d => d.Bio, o => o.MapFrom(s => s.AppUser.Bio));
        }
    }
}