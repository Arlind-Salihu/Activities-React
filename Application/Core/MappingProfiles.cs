using AutoMapper;
using Domain;

namespace Application.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Telefoni , Telefoni>();
            CreateMap<Laptopi, Laptopi>();
        }
    }
}