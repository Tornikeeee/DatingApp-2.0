using System.ComponentModel.DataAnnotations;

namespace DatingApp.API.Dtos
{
    public class UserForRegisterDto
    {
        public string Username { get; set; }
        
        [Required]
        public string Password { get; set; }
    }
}