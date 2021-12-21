using System.Linq;
using Application.Comments;
using Application.Profiles;
using Application.Telefonat;
using AutoMapper;
using Domain;

namespace Application.Core
{
    public class MappingProfiles : AutoMapper.Profile
    {
        public MappingProfiles()
        {
            string currentUsername = null;
            CreateMap<Telefoni, Telefoni>();

            CreateMap<Telefoni, TelefoniDto>()
            .ForMember(d => d.HostUsername, o => o.MapFrom(s => s.TelefonatPrezencat
            .FirstOrDefault(x => x.isHost).AppUser.UserName));

            CreateMap<TelefonatPrezenca, PrezencaDto>()
            .ForMember(d => d.DisplayName, o => o.MapFrom(s => s.AppUser.DisplayName))
            .ForMember(d => d.Username, o => o.MapFrom(s => s.AppUser.UserName))
            .ForMember(d => d.Bio, o => o.MapFrom(s => s.AppUser.Bio))
            .ForMember(d => d.Image, o => o.MapFrom(s => s.AppUser.Photos.FirstOrDefault(x => x.IsMain).Url))
            .ForMember(d => d.FollowersCount, o => o.MapFrom(s => s.AppUser.Followers.Count))
            .ForMember(d => d.FollowingCount, o => o.MapFrom(s => s.AppUser.Followings.Count))
            .ForMember(d => d.Following, o => o.MapFrom(s => s.AppUser.Followers.Any(x => x.Observer.UserName == currentUsername)));

            CreateMap<AppUser, Profiles.Profile>().ForMember(d => d.Image, o => o.MapFrom(s => s.Photos.FirstOrDefault(x => x.IsMain).Url))
            .ForMember(d => d.FollowersCount, o => o.MapFrom(s => s.Followers.Count))
            .ForMember(d => d.FollowingCount, o => o.MapFrom(s => s.Followings.Count))
            .ForMember(d => d.Following, o => o.MapFrom(s => s.Followers.Any(x => x.Observer.UserName == currentUsername)));

            CreateMap<Comment, CommentDto>().ForMember(d => d.DisplayName, o => o.MapFrom(s => s.Author.DisplayName))
            .ForMember(d => d.Username, o => o.MapFrom(s => s.Author.UserName))
            .ForMember(d => d.Image, o => o.MapFrom(s => s.Author.Photos.FirstOrDefault(x => x.IsMain).Url));

            CreateMap<TelefonatPrezenca, UserTelefoniDto>()
            .ForMember(d => d.Id, o => o.MapFrom(s => s.Telefoni.Id))
            .ForMember(d => d.Emri, o => o.MapFrom(s => s.Telefoni.Emri))
            .ForMember(d => d.Kategoria, o => o.MapFrom(s => s.Telefoni.Kategoria))
            .ForMember(d => d.Data, o => o.MapFrom(s => s.Telefoni.Data))
            .ForMember(d => d.HostUsername, o => o.MapFrom(s => s.Telefoni.TelefonatPrezencat.FirstOrDefault(x => x.isHost).AppUser.UserName));
        }
    }
}